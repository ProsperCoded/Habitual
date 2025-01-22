import { index, pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';
import { user } from './users.schema';
import { relations } from 'drizzle-orm';
import { integer } from 'drizzle-orm/pg-core';
import { executionLogs } from 'src/drizzle/schema/executionLogs.schema';

// export const HabitState = pgEnum('habitState', ['private', 'public']);
export const habit = pgTable('habits', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  // habitState: HabitState('habitState').notNull(),
  description: text('description').notNull(),
  creatorId: integer('creatorId')
    .notNull()
    .references(() => user.id),
});

// Create pivot table
export const habitActiveUsers = pgTable(
  'habitActiveUsers',
  {
    habitId: integer('habitId')
      .notNull()
      .references(() => habit.id, { onDelete: 'cascade' }),
    userId: integer('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.habitId, table.userId],
      name: 'habitActiveUsers_pk',
    }),
    userIdIndex: index('userIdIndex').on(table.userId),
  }),
);

// Define relations
export const habitsRelations = relations(habit, ({ many, one }) => ({
  activeUsers: many(habitActiveUsers),
  creator: one(user, {
    fields: [habit.creatorId],
    references: [user.id],
  }),
}));

export const habitActiveUsersRelations = relations(
  habitActiveUsers,
  ({ one }) => ({
    habit: one(habit, {
      fields: [habitActiveUsers.habitId],
      references: [habit.id],
    }),
    user: one(user, {
      fields: [habitActiveUsers.userId],
      references: [user.id],
    }),
  }),
);
