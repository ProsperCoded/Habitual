import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { HabitGroupService } from './habit-group.service';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { JWTGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { ServerResponse } from 'src/lib/types';
import { HabitGroupEntity } from 'src/habit-group/entities/habit-group.entity';

type HabitGroupResponse = Promise<ServerResponse<HabitGroupEntity>>;
type HabitsGroupResponse = Promise<ServerResponse<HabitGroupEntity[]>>;
@Controller('habit-group')
export class HabitGroupController {
  constructor(private readonly habitGroupService: HabitGroupService) {}

  @Get('user')
  @UseGuards(JWTGuard)
  async findUserGroups(@Req() req: Request): HabitsGroupResponse {
    const { id } = req.user as { id: string };
    const habitGroups = await this.habitGroupService.findUserGroups(id);
    let message = 'Successfully fetched all habit groups';
    return { message, data: habitGroups };
  }
  @Get()
  async findAll(): HabitsGroupResponse {
    const habitGroups = await this.habitGroupService.findAll();
    let message = 'Successfully fetched all habit groups';
    return { message, data: habitGroups };
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): HabitGroupResponse {
    const habitGroup = await this.habitGroupService.findOne(id);
    if (!habitGroup) {
      throw new NotFoundException('Habit Group not found');
    }
    let message = 'Successfully fetched habit group';
    return { message, data: habitGroup };
  }
  @Post()
  @UseGuards(JWTGuard)
  async create(
    @Req() req: Request,
    @Body() createHabitGroupDto: CreateHabitGroupDto,
  ): HabitGroupResponse {
    const { id } = req.user as { id: string };
    const createdGroup = await this.habitGroupService.create(
      id,
      createHabitGroupDto,
    );
    let message = 'Successfully created habit group';
    return { message, data: createdGroup };
  }

  @Put('/join-group/:id')
  @UseGuards(JWTGuard)
  async joinGroup(
    @Req() req: Request,
    @Param('id', ParseIntPipe) groupId: string,
  ): HabitGroupResponse {
    const { id } = req.user as { id: string };
    await this.habitGroupService.joinGroup(id, groupId);
    let message = 'Successfully Joined Habit Group';
    return { message, data: null };
  }
  @Put('/leave-group/:id')
  @UseGuards(JWTGuard)
  async leaveGroup(
    @Req() req: Request,
    @Param('id', ParseIntPipe) groupId: string,
  ): HabitGroupResponse {
    const { id: userId } = req.user as { id: string };
    const group = await this.habitGroupService.leaveGroup(userId, groupId);
    let message = `Successfully Left Habit Group ${group.name}`;
    return { message, data: group };
  }
  @Delete(':id')
  @UseGuards(JWTGuard)
  async remove(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: string,
  ): HabitGroupResponse {
    const { id: userId } = req.user as { id: string };
    await this.habitGroupService.deleteGroup(userId, id);
    let message = 'Successfully deleted habit group';
    return { message, data: null };
  }
}
