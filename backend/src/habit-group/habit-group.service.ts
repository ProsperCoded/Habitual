import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { UpdateHabitGroupDto } from './dto/update-habit-group.dto';
import { UserService } from 'src/user/user.service';
import { DRIZZLE_SYMBOL } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/lib/types';
import { habitGroup } from 'src/drizzle/schema/habitGroup.schema';
import { ServerResponse } from 'src/lib/types';
import { groupMember } from 'src/drizzle/schema/groupMembers.schema';
import { and, eq } from 'drizzle-orm';
import { HabitGroupEntity } from 'src/habit-group/entities/habit-group.entity';
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
  async findOne(id: string) {
    try {
      const habitGroup = await this.db.query.habitGroup.findFirst({
        where: (table, { eq }) => eq(table.id, +id),
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
}
