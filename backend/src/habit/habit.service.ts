import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { DRIZZLE_SYMBOL } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/lib/types';
import { habit, habit as habitSchema } from 'src/drizzle/schema/habit.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class HabitService {
  constructor(@Inject(DRIZZLE_SYMBOL) private db: DrizzleDB) {}
  async create(userId: number, createHabitDto: CreateHabitDto) {
    const createdHabit = await this.db
      .insert(habitSchema)
      .values([{ ...createHabitDto, creatorId: userId }])
      .returning();
    return createdHabit[0];
  }
  async findAll() {
    try {
      const habits = await this.db.query.habit.findMany({
        with: {
          creator: true,
          groups: {
            where: (g, { eq }) => eq(g.groupState, 'public'),
          },
        },
      });
      return habits;
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        message: 'Failed to fetch habits',
        data: null,
        error: error.message,
      });
    }
  }
  async findOne(id: number) {
    try {
      const habit = await this.db.query.habit.findFirst({
        where: (habits, { eq }) => eq(habits.id, id),
        with: {
          creator: true,
          groups: {
            where: (g, { eq }) => eq(g.groupState, 'public'),
          },
        },
      });
      if (!habit) throw new NotFoundException('Habit not found');
      return habit;
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        message: 'Failed to fetch habit',
        data: null,
        error: error.message,
      });
    }
  }

  async findCreated(userId: number) {
    return await this.db.query.habit.findMany({
      where: (habits, { eq }) => eq(habits.creatorId, userId),
      with: {
        creator: true,
        groups: {
          where: (g, { eq }) => eq(g.groupState, 'public'),
        },
      },
    });
  }

  async update(
    userId: number,
    habitId: number,
    updateHabitDto: UpdateHabitDto,
  ) {
    try {
      const updatedHabit = await this.db
        .update(habitSchema)
        .set(updateHabitDto)
        .where(and(eq(habit.id, habitId), eq(habit.creatorId, userId)))
        .returning();
      if (!updatedHabit.length)
        throw new NotFoundException(
          'Habit not found or You are not the creator',
        );
      return updatedHabit[0];
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        message: 'Failed to update habit',
        data: null,
        error: error.message,
      });
    }
  }

  async delete(habitId: number, userId: number) {
    try {
      const deletedHabit = await this.db
        .delete(habitSchema)
        .where(and(eq(habit.id, habitId), eq(habit.creatorId, userId)));
      if (!deletedHabit.rowCount)
        throw new NotFoundException(
          'Habit not found, ensure that you are the creator of the habit',
        );
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        message: 'Failed to delete habit',
        data: null,
        error: error.message,
      });
    }
  }
}
