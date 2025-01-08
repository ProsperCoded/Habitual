import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitGroupDto } from './create-habit-group.dto';

export class UpdateHabitGroupDto extends PartialType(CreateHabitGroupDto) {}
