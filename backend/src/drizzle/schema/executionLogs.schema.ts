import {
  pgTable,
  serial,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { user } from './users.schema';
import { habitGroup } from './habitGroup.schema';
import { relations } from 'drizzle-orm';

export const executionLogs = pgTable(
  'executionLogs',
  {
    id: serial('id').primaryKey(), // Auto-incrementing ID
    userId: integer('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    groupId: integer('groupId')
      .notNull()
      .references(() => habitGroup.id, { onDelete: 'cascade' }),
    // habitId: integer('habitId')
    //   .notNull()
    //   .references(() => habit.id, { onDelete: 'cascade' }),
    completionTime: timestamp('completionTime').notNull(), // Logs the exact time
  },
  (table) => {
    return {
      userGroupIndex: index('executionLogs_user_group_idx').on(
        table.userId,
        table.groupId,
      ),
    };
  },
);

// Define relation
export const habitLogsRelations = relations(executionLogs, ({ one }) => ({
  user: one(user, {
    fields: [executionLogs.userId],
    references: [user.id],
  }),
  group: one(habitGroup, {
    fields: [executionLogs.groupId],
    references: [habitGroup.id],
  }),
}));
