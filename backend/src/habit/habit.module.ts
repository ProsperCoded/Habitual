import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HabitController],
  providers: [HabitService],
  imports: [DrizzleModule, AuthModule],
})
export class HabitModule {}
