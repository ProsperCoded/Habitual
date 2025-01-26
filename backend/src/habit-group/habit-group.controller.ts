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
import { ExecutionLogsEntity, ServerResponse } from 'src/lib/types';
import { HabitGroupEntity } from 'src/habit-group/entities/habit-group.entity';
import { UpdateHabitGroupDto } from 'src/habit-group/dto/update-habit-group.dto';

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
  @Get('created')
  @UseGuards(JWTGuard)
  async findCreatedGroups(@Req() req: Request): HabitsGroupResponse {
    const { id } = req.user as { id: string };
    const habitGroups = await this.habitGroupService.findCreatedGroups(id);
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
  @UseGuards(JWTGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: string,
    @Req() req: Request,
  ): HabitGroupResponse {
    const { id: userId } = req.user as { id: string };
    const habitGroup = await this.habitGroupService.findOne(userId, id);
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

  @Put(':id')
  @Put('/join-group/:id')
  @UseGuards(JWTGuard)
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) groupId: string,
    @Body() dto: UpdateHabitGroupDto,
  ): HabitGroupResponse {
    const userId = (req.user as { id: string }).id;
    const updated = await this.habitGroupService.update(userId, groupId, dto);
    return { message: 'Successfully updated habit group', data: updated };
  }
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

  @Get('/executed-logs/user/:id')
  @UseGuards(JWTGuard)
  async getExecutedHabits(
    @Req() req: Request,
    @Param('id', ParseIntPipe) groupId: string,
  ): Promise<ServerResponse<ExecutionLogsEntity>> {
    const { id: userId } = req.user as { id: string };
    const executedHabits = await this.habitGroupService.getExecutedHabits(
      userId,
      groupId,
    );
    let message = 'Successfully fetched executed habits';
    return { message, data: executedHabits };
  }
  @Get('/executed-logs/:id')
  @UseGuards(JWTGuard)
  async getAllExecuted(
    @Req() req: Request,
    @Param('id', ParseIntPipe) groupId: string,
  ): Promise<ServerResponse<ExecutionLogsEntity>> {
    const { id: userId } = req.user as { id: string };
    const allExecutedHabits = await this.habitGroupService.getAllExecuted(
      userId,
      groupId,
    );
    let message = 'Successfully fetched executed habits';
    return { message, data: allExecutedHabits };
  }
  @Post('execute-habit/:id')
  @UseGuards(JWTGuard)
  async executeHabit(
    @Req() req: Request,
    @Param('id', ParseIntPipe) groupId: string,
  ): Promise<ServerResponse<any>> {
    const { id: userId } = req.user as { id: string };
    const executionLog = await this.habitGroupService.executeHabit(
      userId,
      groupId,
    );
    let message = 'Successfully executed habit';
    return { message, data: executionLog };
  }
}
