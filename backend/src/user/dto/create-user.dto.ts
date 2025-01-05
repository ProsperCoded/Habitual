import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  // Todo: Add validation for access token and refresh token
  accessToken?: string;
  refreshToken?: string;
}
