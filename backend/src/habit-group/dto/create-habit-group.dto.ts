import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDateString,
  IsOptional,
  IsIn,
  ValidationOptions,
  registerDecorator,
  IsTimeZone,
} from 'class-validator';

export class CreateHabitGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['private', 'public'])
  groupState: 'private' | 'public';

  @IsInt()
  habitId: number;

  @IsNotEmpty()
  // ISO date format
  // YYYY-MM-DDTHH:MM:SS:MSZ
  @IsDateString()
  startDate: string;

  @IsTimeZone()
  @IsString()
  @IsNotEmpty() // Make timezone required for better consistency
  timezone: string;

  @IsNotEmpty()
  @IsString()
  @IsTimeFormat({
    message: 'Time must be in the format "HH:MM:SS"',
  })
  executionTime: string;

  @IsInt()
  tolerance: number;

  @IsNotEmpty()
  @IsOptional()
  @IsValidInterval({
    message: 'Interval must be in the format "number unit" (e.g., "7 days")',
  })
  @IsString()
  interval: string;
}
export function IsValidInterval(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsInterval',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          // More robust interval validation
          const regex = /^[1-9]\d*\s+(day|week|month|year)s?$/;
          if (!regex.test(value)) return false;

          const [count, unit] = value.split(/\s+/);
          const numericCount = parseInt(count);
          return numericCount > 0 && numericCount <= 365; // Reasonable limit
        },
      },
    });
  };
}
export function IsTimeFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsTimeFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const regex = RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$');
          return regex.test(value);
        },
      },
    });
  };
}
