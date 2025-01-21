import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HabitGroupModule } from './habit-group/habit-group.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HabitModule } from './habit/habit.module';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'docs'),
    }),
    HabitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
