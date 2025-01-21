import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';
import { Exclude } from 'class-transformer';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {}
