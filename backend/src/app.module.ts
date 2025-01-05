import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import googleOauthConfig from 'src/config/google-oauth.config';
import jwtConfig from 'src/config/jwt.config';
@Module({
  imports: [
    DrizzleModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleOauthConfig, jwtConfig],
      cache: true,
      expandVariables: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
