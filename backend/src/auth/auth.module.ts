import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { UsersService } from 'src/user/user.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig, { JWT_IDENTIFIER } from 'src/config/jwt.config';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    UsersService,
    {
      provide: JWT_IDENTIFIER,
      useExisting: JwtService,
    },
  ],
  imports: [DrizzleModule, JwtModule.registerAsync(jwtConfig.asProvider())],
})
export class AuthModule {}
