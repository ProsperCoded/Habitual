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
import { HabitGroupService } from './habit-group.service';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { JWTGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { ServerResponse } from 'src/lib/types';
import { HabitEntity } from 'src/habit-group/entities/habit-group.entity';
@Controller('habit-group')
export class HabitGroupController {
  constructor(private readonly habitGroupService: HabitGroupService) {}

  @Get()
  async findAll(): Promise<ServerResponse<HabitEntity[]>> {
    const habitGroups = await this.habitGroupService.findAll();
    let message = 'Successfully fetched all habit grous';
    return { message, data: habitGroups };
  }
  @Post()
  @UseGuards(JWTGuard)
  async create(
    @Req() req: Request,
    @Body() createHabitGroupDto: CreateHabitGroupDto,
  ): Promise<ServerResponse<HabitEntity>> {
    const { id } = req.user as { id: string };
    const createdGroup = await this.habitGroupService.create(
      id,
      createHabitGroupDto,
    );
    let message = 'Successfully created habit group';
    return { message, data: createdGroup };
  }
}
