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
  Query,
} from '@nestjs/common';
import { HabitGroupService } from './habit-group.service';
import { CreateHabitGroupDto } from './dto/create-habit-group.dto';
import { JWTGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import {
  ExecutionLogsEntity,
  ServerResponse,
  StreakEntity,
} from 'src/lib/types';
import { HabitGroupEntity } from 'src/habit-group/entities/habit-group.entity';
import { UpdateHabitGroupDto } from 'src/habit-group/dto/update-habit-group.dto';

type HabitGroupResponse = Promise<ServerResponse<HabitGroupEntity>>;
type HabitsGroupResponse = Promise<ServerResponse<HabitGroupEntity[]>>;
@Controller('habit-group')
export class HabitGroupController {
  constructor(private readonly habitGroupService: HabitGroupService) {}

  @Get('joined')
  @UseGuards(JWTGuard)
  async findUserGroups(@Req() req: Request): HabitsGroupResponse {
    const { id } = req.user as { id: string };
    const habitGroups = await this.habitGroupService.findJoinedGroups(id);
    let message = 'Successfully fetched all groups you are part of';
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

  @Put('/:groupId')
  @UseGuards(JWTGuard)
  async update(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: string,
    @Body() dto: UpdateHabitGroupDto,
  ): HabitGroupResponse {
    const userId = (req.user as { id: string }).id;
    const updated = await this.habitGroupService.update(userId, groupId, dto);
    return { message: 'Successfully updated habit group', data: updated };
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
  // Get backdated logs default to 7 intervals ago
  @Get('/backdated-logs/:groupId/:intervalAgo')
  @UseGuards(JWTGuard)
  async getBackdatedLogs(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('intervalAgo', ParseIntPipe) intervalAgo: number,
  ): Promise<ServerResponse<ExecutionLogsEntity>> {
    const { id: userId } = req.user as { id: string };
    const backdatedLogs = await this.habitGroupService.getBackdatedLog(
      +userId,
      +groupId,
      intervalAgo,
    );
    let message = 'Successfully fetched backdated logs';
    return { message, data: backdatedLogs };
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
  @Get('/executed-logs/:groupId')
  @UseGuards(JWTGuard)
  async getAllExecuted(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: string,
  ): Promise<ServerResponse<ExecutionLogsEntity>> {
    const { id: userId } = req.user as { id: string };
    const allExecutedHabits = await this.habitGroupService.getAllExecuted(
      userId,
      groupId,
    );
    let message = 'Successfully fetched executed habits';
    return { message, data: allExecutedHabits };
  }

  @Get('/paginated-logs/:groupId')
  @UseGuards(JWTGuard)
  async paginatedLogs(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<ServerResponse<ExecutionLogsEntity>> {
    const executedHabits = await this.habitGroupService.paginatedLogs(
      groupId,
      page,
      limit,
    );
    let message = 'Successfully fetched executed habits';
    return { message, data: executedHabits };
  }
  @Post('execute/:id')
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
  @Get('/user-streak/:groupId')
  @UseGuards(JWTGuard)
  async getUserStreak(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<ServerResponse<StreakEntity>> {
    const { id: userId } = req.user as { id: string };
    const streak = await this.habitGroupService.userStreak(+userId, groupId);
    let message = 'Successfully fetched streak';
    return { message, data: streak };
  }

  @Get('/streaks/:groupId')
  @UseGuards(JWTGuard)
  async getGroupStreak(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<ServerResponse<StreakEntity[]>> {
    // const { id: userId } = req.user as { id: string };
    const streak = await this.habitGroupService.groupStreak(+groupId);
    let message = 'Successfully fetched streak';
    return { message, data: streak };
  }
}
