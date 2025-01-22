import { InferSelectModel } from 'drizzle-orm';
import { habit } from 'src/drizzle/schema/habit.schema';

export type HabitEntity = InferSelectModel<typeof habit>;
