import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { UpdateHabitGroupDto } from './dto/update-habit-group.dto';
import { UserService } from 'src/user/user.service';
import { DRIZZLE_SYMBOL } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/lib/types';
import { habitGroup } from 'src/drizzle/schema/habitGroup.schema';
import { ServerResponse } from 'src/lib/types';
import { GroupMembers } from 'src/drizzle/schema/groupMembers.schema';
@Injectable()
export class HabitGroupService {
  constructor(
    private readonly userService: UserService,
    @Inject(DRIZZLE_SYMBOL) private db: DrizzleDB,
  ) {}
  async create(userId: string, createHabitGroupDto: CreateHabitGroupDto) {
    try {
      const createdGroup = await this.db
        .insert(habitGroup)
        .values([{ ...createHabitGroupDto, creatorId: +userId }])
        .returning();
      console.log(createdGroup);
      return createdGroup[0];
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
            // with: {
            //   user: true,
            // },
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
        .insert(GroupMembers)
        .values([{ userId: +userId, groupId: +groupId }]);
      return response;
    } catch (error) {
      console.error(error);
      const response: ServerResponse<null> = {
        message: 'Failed to join habit group',
        data: null,
        error: error.message,
      };
      throw new BadRequestException(response, {
        cause: error,
      });
    }
  }
}
