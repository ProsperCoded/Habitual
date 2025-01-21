import { InferSelectModel } from 'drizzle-orm';
import { habit } from 'src/drizzle/schema/habits.schema';

export type HabitEntity = InferSelectModel<typeof habit>;
