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
import { and, eq } from 'drizzle-orm';
import { HabitGroupEntity } from 'src/habit-group/entities/habit-group.entity';
import * as moment from 'moment';
// import * as moment from 'moment';
import { executionLogs } from 'src/drizzle/schema/executionLogs.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  calcStreak,
  getCurrentDate,
  getCurrentMoment,
  parseInterval,
} from 'src/lib/utils';
import { streak } from 'src/drizzle/schema/streak.schema';
import { user } from 'src/drizzle/schema/users.schema';
@Injectable()
export class HabitGroupService {
  constructor(
    private readonly userService: UserService,
    @Inject(DRIZZLE_SYMBOL) private readonly db: DrizzleDB,
  ) {}
  async create(userId: string, createHabitGroupDto: CreateHabitGroupDto) {
    try {
      // Validate timezone
      if (!moment.tz.zone(createHabitGroupDto.timezone)) {
        throw new BadRequestException('Invalid timezone');
      }

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
      // Validate timezone if it's being updated
      if (dto.timezone && !moment.tz.zone(dto.timezone)) {
        throw new BadRequestException('Invalid timezone');
      }

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
  async findJoinedGroups(userId: string) {
    const groupMembers = await this.db.query.groupMember.findMany({
      where: (table, { eq }) => eq(table.userId, +userId),
      with: {
        group: {
          with: {
            members: {
              with: {
                user: true,
              },
            },
            creator: true,
            habit: true,
          },
        },
      },
    });
    return groupMembers.map(({ group }) => group);
  }
  async findCreatedGroups(userId: string) {
    const habitGroups = await this.db.query.habitGroup.findMany({
      where: (table, { eq }) => eq(table.creatorId, +userId),
      with: {
        habit: true,
        members: {
          with: {
            user: true,
          },
        },
        creator: true,
      },
    });
    return habitGroups;
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
        let timezone = habitGroup.timezone;
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
          members: {
            with: {
              user: true,
            },
          },
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
      // * cascade deletes the group member table automatically when
      // // * Cascade by deleting group members first
      // await this.db
      //   .delete(groupMember)
      //   .where(eq(groupMember.groupId, +groupId));

      const response = await this.db
        .delete(habitGroup)
        .where(
          and(eq(habitGroup.id, +groupId), eq(habitGroup.creatorId, +userId)),
        );
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
    const currentDate = getCurrentMoment(group.timezone);
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

    const startDate = moment.tz(group.startDate, 'YYYY-MM-DD', group.timezone);

    if (startDate.isAfter(currentDate)) {
      throw new BadRequestException({
        message: 'Habit group has not started yet habit',
      });
    }

    const diff = startDate.diff(currentDate, 'days');
    console.log('Days since start date:', diff);

    // * convert the interval to days
    const intervalInDays = parseInterval(group.interval);
    console.log('Interval in days:', intervalInDays);

    // * Determines if the habit is scheduled for today based on the interval.
    const habitIsToday = diff % intervalInDays === 0;
    console.log('Habit is scheduled for today:', habitIsToday);

    if (habitIsToday) {
      const executionTime = moment.tz(
        group.executionTime,
        'HH:mm:ss',
        group.timezone, // Ensure the timezone is correctly used here
      );
      const executionDate = getCurrentMoment(group.timezone).set({
        hour: executionTime.hour(),
        minute: executionTime.minute(),
        second: executionTime.second(),
      });
      const maxTolerance = executionDate
        .clone()
        .add(group.tolerance, 'seconds');
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

  // ? Ensures user can't execute within interval after previously executing a habit
  private async checkPreviousExecutions(
    userId: string,
    group: HabitGroupEntity,
  ) {
    const lastExecution: ExecutionLogsEntity = (
      await this.db.query.executionLogs.findMany({
        where: (table, { and, eq }) =>
          and(eq(table.userId, +userId), eq(table.groupId, +group.id)),
        orderBy: (table, { desc }) => desc(table.completionTime),
      })
    )[0];
    console.log('Last Execution:', lastExecution);
    if (!lastExecution) return true;
    const lastDateExecuted = moment.tz(
      lastExecution.completionTime as Date,
      group.timezone,
    );
    const executionTime = moment(
      group.executionTime,
      'HH:mm:ss',
      group.timezone,
    );

    // * removing the extra time from the last execution
    lastDateExecuted.set({
      hour: executionTime.hour(),
      minute: executionTime.minute(),
      second: executionTime.second(),
    });
    console.log('Last Date Executed:', lastDateExecuted.format());

    // *Ensuring user can't execute within interval after previously executing a habit

    // * convert the interval to days
    const intervalInDays = parseInterval(group.interval);
    console.log('Interval in Days:', intervalInDays);
    const dateToNextExecute = moment(lastDateExecuted).add(
      intervalInDays,
      'days',
    );
    console.log('Date to Next Execute:', dateToNextExecute.format());
    const today = getCurrentMoment(group.timezone);
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
              // Store in UTC
              completionTime: moment.tz(group.timezone).utc().toDate(),
            },
          ])
          .returning()
      )[0];
      // Update streak  for user(create if it doesn't exists)
      const previousStreak = await this.db.query.streak.findFirst({
        where: (table, { and, eq }) =>
          and(eq(table.userId, +userId), eq(table.groupId, +group.id)),
      });
      if (!previousStreak) {
        await this.db.insert(streak).values([
          {
            userId: +userId,
            groupId: +group.id,
            currentStreak: 1,
            longestStreak: 1,
            lastChecked: getCurrentDate(group.timezone),
          },
        ]);
      } else {
        await this.db.update(streak).set({
          currentStreak: previousStreak.currentStreak + 1,
          longestStreak:
            previousStreak.currentStreak + 1 > previousStreak.longestStreak
              ? previousStreak.currentStreak + 1
              : previousStreak.longestStreak,
          lastChecked: getCurrentDate(group.timezone),
        });
      }
      console.log('Execution Log:', executionLog);
      return executionLog;
    }
  }
  async getExecutedHabits(userId: string, groupId: string) {
    const executionLogs = await this.db.query.executionLogs.findMany({
      where: (table, { and, eq }) =>
        and(eq(table.userId, +userId), eq(table.groupId, +groupId)),
      with: {
        user: true,
      },
    });
    return executionLogs;
  }
  async getAllExecuted(userId: string, groupId: string) {
    const executionLogs = await this.db.query.executionLogs.findMany({
      where: (table, { eq }) => eq(table.groupId, +groupId),
      with: {
        user: true,
      },
    });
    return executionLogs;
  }
  async paginatedLogs(
    userId: string,
    groupId: string,
    page: number,
    limit: number,
  ) {
    const executionLogs = await this.db.query.executionLogs.findMany({
      where: (table, { and, eq }) =>
        and(eq(table.userId, +userId), eq(table.groupId, +groupId)),
      with: {
        user: true,
      },
      orderBy: (table, { desc }) => desc(table.completionTime),
      offset: (page - 1) * limit,
      limit,
    });
    return executionLogs;
  }
  async getBackdatedLog(userId: number, groupId: number, intervalAgo: number) {
    const group = await this.db.query.habitGroup.findFirst({
      where: (table, { eq }) => eq(table.id, +groupId),
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // * convert the interval to days
    const intervalInDays = parseInterval(group.interval);
    console.log('Interval in days:', intervalInDays);

    // Convert backDate to UTC for database query
    const backDate = moment()
      .tz(group.timezone)
      .subtract(intervalInDays * intervalAgo, 'days')
      .utc();

    const executionLogs = await this.db.query.executionLogs.findMany({
      where: (table, { and, eq, gte }) =>
        and(
          eq(table.userId, userId),
          eq(table.groupId, groupId),
          gte(table.completionTime, backDate.toDate()),
        ),
      with: {
        user: true,
      },
    });
    // Convert results back to group timezone
    return executionLogs.map((log) => ({
      ...log,
      completionTime: moment
        .utc(log.completionTime)
        .tz(group.timezone)
        .toDate(),
    }));
  }
  async groupStreak(groupId: number) {
    const streak = await this.db.query.streak.findMany({
      where: (table, { eq }) => eq(table.groupId, groupId),
    });
    return streak;
  }
  async userStreak(userId: number, groupId: number) {
    const streak = await this.db.query.streak.findFirst({
      where: (table, { and, eq }) =>
        and(eq(table.userId, userId), eq(table.groupId, groupId)),
    });
    return streak;
  }
  // STREAKS //
  // Cache the streaks for every user and every group daily.
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cacheStreaks() {
    const groups = await this.db.query.habitGroup.findMany({
      with: {
        members: true,
      },
    });
    for (let group of groups) {
      // Use group timezone for midnight
      const currentDate = moment
        .tz(group.timezone)
        .startOf('day')
        .utc()
        .toDate();
      for (let member of group.members) {
        this.db.query.executionLogs
          .findMany({
            where: (table, { and, eq }) =>
              and(eq(table.userId, member.userId), eq(table.groupId, group.id)),
            orderBy: (table, { desc }) => desc(table.completionTime),
          })
          .then(async (logs) => {
            const streakNo = calcStreak(
              logs,
              parseInterval(group.interval),
              group.tolerance,
            );
            let previousStrick = await this.db.query.streak.findFirst({
              where: (table, { and, eq }) =>
                and(
                  eq(table.userId, member.userId),
                  eq(table.groupId, group.id),
                ),
            });
            if (!previousStrick) {
              this.db.insert(streak).values([
                {
                  userId: member.userId,
                  groupId: group.id,
                  currentStreak: streakNo,
                  longestStreak: streakNo,
                  lastChecked: currentDate,
                },
              ]);
            } else {
              this.db
                .update(streak)
                .set({
                  currentStreak: streakNo,
                  longestStreak:
                    streakNo > previousStrick.longestStreak
                      ? streakNo
                      : previousStrick.longestStreak,
                  lastChecked: currentDate,
                })
                .where(
                  and(eq(user.id, member.userId), eq(habitGroup.id, group.id)),
                );
            }
          });
      }
    }
    console.log(
      "Executed streaks' cache, for all users and groups " +
        new Date().toISOString(),
    );
  }
}
