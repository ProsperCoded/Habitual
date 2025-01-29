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
  // YYYY-MM-DD
  @IsDateString()
  startDate: string;

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
          const regex = RegExp('^[0-9]+ (days?)|(weeks?)|(months?)|(years?)$');
          return regex.test(value);
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
