import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DrizzleModule],
})
export class UsersModule {}
