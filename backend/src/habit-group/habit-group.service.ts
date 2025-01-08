import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { UpdateHabitGroupDto } from './dto/update-habit-group.dto';
import { UserService } from 'src/user/user.service';
import { DRIZZLE_SYMBOL } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/lib/types';
import { habitGroup } from 'src/drizzle/schema/habitGroup.schema';
import { ServerResponse } from 'src/lib/types';
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

  findAll(includePrivate = false) {
    return this.db.query.habitGroup.findMany({
      where: !includePrivate
        ? (table, { eq }) => eq(table.groupState, 'public')
        : undefined,
      with: {
        creator: true,
        habit: true,
        members: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} habitGroup`;
  }

  update(id: number, updateHabitGroupDto: UpdateHabitGroupDto) {
    return `This action updates a #${id} habitGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitGroup`;
  }
}
