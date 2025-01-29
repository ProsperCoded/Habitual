import { relations } from 'drizzle-orm';
import { integer, pgTable, date, primaryKey } from 'drizzle-orm/pg-core';
import { habit } from 'src/drizzle/schema/habit.schema';
import { habitGroup } from 'src/drizzle/schema/habitGroup.schema';
import { user } from 'src/drizzle/schema/users.schema';

export const streak = pgTable(
  'streaks',
  {
    groupId: integer('groupId')
      .notNull()
      .references(() => habitGroup.id),
    userId: integer('userId')
      .notNull()
      .references(() => user.id),
    currentStreak: integer('currentStreak').notNull(),
    longestStreak: integer('longestStreak').notNull(),
    lastChecked: date('lastChecked').notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.groupId, table.userId],
      name: 'streak_pk',
    }),
  }),
);

export const streakRelations = relations(streak, ({ one }) => ({
  group: one(habitGroup, {
    fields: [streak.groupId],
    references: [habitGroup.id],
  }),
  user: one(user, {
    fields: [streak.userId],
    references: [user.id],
  }),
}));
