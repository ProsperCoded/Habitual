import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HabitGroupModule } from './habit-group/habit-group.module';
import googleOauthConfig from 'src/config/google-oauth.config';
import jwtConfig from 'src/config/jwt.config';
import config from 'src/config/config';
@Module({
  imports: [
    DrizzleModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleOauthConfig, jwtConfig, config],
      cache: true,
      expandVariables: true,
    }),
    AuthModule,
    HabitGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
