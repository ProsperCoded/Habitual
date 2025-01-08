import { InferSelectModel } from 'drizzle-orm';
import { user } from 'src/drizzle/schema/users.schema';

export type UserEntity = InferSelectModel<typeof user>;
