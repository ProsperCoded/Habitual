import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { UpdateHabitGroupDto } from './dto/update-habit-group.dto';
import { UserService } from 'src/user/user.service';
import { DRIZZLE_SYMBOL } from 'src/drizzle/drizzle.module';
import { DrizzleDB, ExecutionLogsEntity } from 'src/lib/types';
import { habitGroup } from 'src/drizzle/schema/habitGroup.schema';
import { ServerResponse } from 'src/lib/types';
import { groupMember } from 'src/drizzle/schema/groupMembers.schema';
import { and, eq, InferSelectModel } from 'drizzle-orm';
import { HabitGroupEntity } from 'src/habit-group/entities/habit-group.entity';
import * as moment from 'moment';
import { executionLogs } from 'src/drizzle/schema/executionLogs.schema';
@Injectable()
export class HabitGroupService {
  constructor(
    private readonly userService: UserService,
    @Inject(DRIZZLE_SYMBOL) private readonly db: DrizzleDB,
  ) {}
  async create(userId: string, createHabitGroupDto: CreateHabitGroupDto) {
    try {
      const createdGroups = await this.db
        .insert(habitGroup)
        .values([{ ...createHabitGroupDto, creatorId: +userId }])
        .returning();
      const createdGroup = createdGroups[0];
      // ? Join the group, as the creator
      await this.joinGroup(userId, createdGroup.id.toString());
      return createdGroup;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to create habit group',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
  async update(userId: string, groupId: string, dto: UpdateHabitGroupDto) {
    try {
      const response = await this.db
        .update(habitGroup)
        .set(dto)
        .where(
          and(eq(habitGroup.id, +groupId), eq(habitGroup.creatorId, +userId)),
        )
        .returning();
      return response[0];
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to update habit group, or ensure you are the creator',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
  async findUserGroups(userId: string) {
    const groupMembers = await this.db.query.groupMember.findMany({
      where: (table, { eq }) => eq(table.userId, +userId),
      with: {
        group: {
          with: {
            habit: true,
          },
        },
      },
    });
    return groupMembers.map(({ group }) => group);
  }
  async findOne(userId: string, groupId: string) {
    try {
      const habitGroup = (await this.db.query.habitGroup.findFirst({
        where: (table, { eq }) => eq(table.id, +groupId),
        with: {
          creator: true,
          habit: true,
          members: {
            with: {
              user: true,
            },
          },
        },
      })) as HabitGroupEntity;
      try {
        const shouldExecute = await this.shouldExecute(userId, habitGroup);
        habitGroup.execute = {
          shouldExecute,
        };
      } catch (error) {
        habitGroup.execute = {
          shouldExecute: false,
          error: error.message,
        };
      }
      return habitGroup;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to fetch habit group',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
  async findAll(includePrivate = false) {
    try {
      const habitGroups = await this.db.query.habitGroup.findMany({
        where: !includePrivate
          ? (table, { eq }) => eq(table.groupState, 'public')
          : undefined,
        with: {
          creator: true,
          habit: true,
          members: true,
        },
      });
      return habitGroups;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to fetch habit groups',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }

  async joinGroup(userId: string, groupId: string) {
    try {
      const response = await this.db
        .insert(groupMember)
        .values([{ userId: +userId, groupId: +groupId }]);
      return response;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to join habit group',
        data: null,
        error: error.detail || error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
  async leaveGroup(userId: string, groupId: string): Promise<HabitGroupEntity> {
    try {
      console.log({ userId, groupId });
      const response = await this.db
        .delete(groupMember)
        .where(
          and(
            eq(groupMember.userId, +userId),
            eq(groupMember.groupId, +groupId),
          ),
        );
      if (!response.rowCount) {
        throw new Error("User not part of group or group doesn't exists ");
      }
      console.log({ response });
      // ? Fetch group associated with it
      const group = await this.db.query.habitGroup.findFirst({
        where: (table, { eq }) => eq(table.id, +groupId),
        with: {
          members: true,
        },
      });
      return group;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to leave habit group',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
  async deleteGroup(userId: string, groupId: string) {
    try {
      const response = await this.db
        .delete(habitGroup)
        .where(
          and(eq(habitGroup.id, +groupId), eq(habitGroup.creatorId, +userId)),
        );

      // * Delete all members of this group
      await this.db
        .delete(groupMember)
        .where(eq(groupMember.groupId, +groupId));
      return response;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to delete habit group, or ensure you are the creator',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
  /**
   * Executes a habit for a user within a specified habit group.
   *
   * @param userId - The ID of the user executing the habit.
   * @param groupId - The ID of the habit group.
   * @returns A promise that resolves to a boolean indicating whether the habit was executed successfully.
   * @throws NotFoundException - If the habit group is not found.
   *
   * The function performs the following steps:
   * 1. Retrieves the habit group from the database using the provided groupId.
   * 2. Calculates the difference in days between the current date and the group's start date.
   * 3. Parses the interval value and quantity from the group's interval string.
   * 4. Determines if the habit is scheduled for today based on the interval.
   * 5. If the habit is scheduled for today, checks if the current time is within the allowed execution time window.
   * 6. If the current time is within the allowed window, logs the habit execution in the database.
   */
  async shouldExecute(userId: string, group: HabitGroupEntity) {
    const currentDate = moment();
    console.log('Current Time:', currentDate.format());

    const shouldExecuteHabit = await this.checkPreviousExecutions(
      userId,
      group,
    );
    if (!shouldExecuteHabit) {
      throw new BadRequestException({
        message: 'You have already executed a habit within the interval',
        cause: '',
      });
    }

    const startDate = moment(group.startDate, 'YYYY-MM-DD');

    if (startDate.isAfter(currentDate)) {
      throw new BadRequestException({
        message: 'Habit group has not started yet habit',
      });
    }

    const diff = startDate.diff(currentDate, 'days');
    console.log('Days since start date:', diff);

    const interval = this.parseInterval(group.interval);
    console.log('Interval:', interval);

    // * convert the interval to days
    const intervalInDays = this.getIntervalDays(
      interval.value,
      interval.quantity,
    );
    console.log('Interval in days:', intervalInDays);

    // * Determines if the habit is scheduled for today based on the interval.
    const habitIsToday = diff % intervalInDays === 0;
    console.log('Habit is scheduled for today:', habitIsToday);

    if (habitIsToday) {
      const executionTime = moment(group.executionTime, 'HH:mm:ss');
      const executionDate = moment().set({
        hour: executionTime.hour(),
        minute: executionTime.minute(),
        second: executionTime.second(),
      });
      const maxTolerance = moment(executionDate).add(
        group.tolerance,
        'seconds',
      );
      console.log('Execution Date:', executionDate.format());
      console.log('Current Time:', currentDate.format());
      console.log('Max Tolerance:', maxTolerance.format());

      // * checks if the current time is within the allowed execution time window.
      if (currentDate.isBetween(executionDate, maxTolerance)) {
        // * Insert into execution logs
        return true;
      } else {
        console.log('Habit execution time has passed');
        throw new BadRequestException('Habit execution time has passed');
      }
    } else {
      console.log('Habit not scheduled for today');
      throw new BadRequestException('Habit not scheduled for today');
    }
  }

  private parseInterval(interval: string) {
    const valueRegex = RegExp('^[0-9]+');
    const quantityRegex = RegExp('(days?)|(weeks?)|(months?)|(years?)$');
    return {
      value: interval.match(valueRegex)[0],
      quantity: interval.match(quantityRegex)[0],
    };
  }

  private getIntervalDays(value: string, quantity: string): number {
    return moment.duration({ [quantity]: value }).asDays();
  }

  // ? Ensures user can't execute within interval after previously executing a habit
  private async checkPreviousExecutions(
    userId: string,
    group: HabitGroupEntity,
  ) {
    const lastExecution = (
      await this.db.query.executionLogs.findMany({
        where: (table, { and, eq }) =>
          and(eq(table.userId, +userId), eq(table.groupId, +group.id)),
        orderBy: (table, { desc }) => desc(table.completionTime),
      })
    )[0] as ExecutionLogsEntity;
    console.log('Last Execution:', lastExecution);
    if (!lastExecution) return true;
    const lastDateExecuted = moment(lastExecution.completionTime);
    const executionTime = moment(group.executionTime, 'HH:mm:ss');

    // * removing the extra time from the last execution
    lastDateExecuted.set({
      hour: executionTime.hour(),
      minute: executionTime.minute(),
      second: executionTime.second(),
    });
    console.log('Last Date Executed:', lastDateExecuted.format());

    // *Ensuring user can't execute within interval after previously executing a habit
    const interval = this.parseInterval(group.interval);
    console.log('Interval:', interval);

    // * convert the interval to days
    const intervalInDays = this.getIntervalDays(
      interval.value,
      interval.quantity,
    );
    console.log('Interval in Days:', intervalInDays);
    const dateToNextExecute = moment(lastDateExecuted).add(
      intervalInDays,
      'days',
    );
    console.log('Date to Next Execute:', dateToNextExecute.format());
    const today = moment();
    console.log('Today:', today.format());

    if (dateToNextExecute.isAfter(today)) {
      console.log('Cannot execute habit yet');
      return false;
    }
    console.log('Can execute habit');
    return true;
  }
  async executeHabit(userId: string, groupId: string) {
    const group = await this.db.query.habitGroup.findFirst({
      where: (table, { eq }) => eq(table.id, +groupId),
    });
    if (!group) {
      console.log('Group not found');
      throw new NotFoundException('Group not found');
    }
    console.log('Group:', group);
    const shouldExecute = await this.shouldExecute(userId, group);
    if (shouldExecute) {
      const executionLog = (
        await this.db
          .insert(executionLogs)
          .values([
            {
              userId: +userId,
              groupId: +group.id,
              completionTime: new Date(),
            },
          ])
          .returning()
      )[0];
      console.log('Execution Log:', executionLog);
      return executionLog;
    }
  }
}
