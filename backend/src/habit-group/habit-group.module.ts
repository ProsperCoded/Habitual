import { Module } from '@nestjs/common';
import { HabitGroupService } from './habit-group.service';
import { HabitGroupController } from './habit-group.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/user.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [HabitGroupController],
  providers: [HabitGroupService],
  imports: [AuthModule, UsersModule, DrizzleModule],
})
export class HabitGroupModule {}
