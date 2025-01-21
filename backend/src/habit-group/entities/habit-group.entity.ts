import { habitGroup } from 'src/drizzle/schema/habitGroup.schema';
import { InferSelectModel } from 'drizzle-orm';

export type HabitGroupEntity = InferSelectModel<typeof habitGroup>;
