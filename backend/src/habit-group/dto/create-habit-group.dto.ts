import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDateString,
  IsOptional,
  IsIn,
  ValidationOptions,
  registerDecorator,
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
  @IsDateString()
  startDate: string;

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
          const regex = RegExp('^[0-9]+ [A-Za-z]+$');
          return regex.test(value);
        },
      },
    });
  };
}
