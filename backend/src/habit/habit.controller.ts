import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HabitService } from './habit.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { ServerResponse } from 'src/lib/types';
import { HabitEntity } from './entities/habit.entity';
import { JWTGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

type HabitResponse = Promise<ServerResponse<HabitEntity>>;
type HabitsResponse = Promise<ServerResponse<HabitEntity[]>>;
@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  @UseGuards(JWTGuard)
  async create(
    @Body() createHabitDto: CreateHabitDto,
    @Req() req: Request,
  ): Promise<ServerResponse<HabitEntity>> {
    const { id } = req.user as { id: string };
    const habit = await this.habitService.create(+id, createHabitDto);
    return { data: habit, message: 'Successfully Created Habit' };
  }

  @Get()
  async findAll(): HabitsResponse {
    return {
      data: await this.habitService.findAll(),
      message: 'Successfully Fetched Habits',
    };
  }

  @Get('created')
  @UseGuards(JWTGuard)
  async findMine(@Req() req: Request): HabitsResponse {
    const { id } = req.user as { id: string };
    return {
      data: await this.habitService.findCreated(+id),
      message: 'Successfully Fetched Your Habits',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JWTGuard)
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateHabitDto: UpdateHabitDto,
  ): HabitResponse {
    const { id: userId } = req.user as { id: string };
    const updatedHabit = await this.habitService.update(
      +userId,
      +id,
      updateHabitDto,
    );
    return { data: updatedHabit, message: 'Successfully Updated Habit' };
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  async remove(@Param('id') id: string, @Req() req: Request): HabitResponse {
    const { id: userId } = req.user as { id: string };
    await this.habitService.delete(+id, +userId);
    return { data: null, message: 'Successfully Deleted Habit' };
  }
}
