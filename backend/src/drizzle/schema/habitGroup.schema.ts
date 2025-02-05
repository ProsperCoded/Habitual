import {
  date,
  integer,
  interval,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { habit } from './habit.schema';
import { user } from './users.schema';
import { groupMember } from './groupMembers.schema';
import { executionLogs } from 'src/drizzle/schema/executionLogs.schema';
export const groupState = pgEnum('groupState', ['private', 'public']);
// Habit group table
export const habitGroup = pgTable('habitGroup', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  groupState: groupState('groupState').notNull(),
  habitId: integer('habitId').references(() => habit.id),
  startDate: date('startDate')
    .default(sql`CURRENT_DATE`)
    .notNull(),
  executionTime: time('time')
    .default(sql`CURRENT_TIME`)
    .notNull(),
  timezone: text('timezone').notNull(),
  // tolerance will be a number after executeTime, that habit acknoledgement can still occur
  // seconds
  tolerance: integer('tolerance').default(0).notNull(),
  interval: interval('interval').default('1 day').notNull(),
  creatorId: integer('creatorId')
    .notNull()
    .references(() => user.id),
});

// Define relation
export const habitGroupRelations = relations(habitGroup, ({ one, many }) => ({
  creator: one(user, {
    fields: [habitGroup.creatorId],
    references: [user.id],
  }),
  habit: one(habit, {
    fields: [habitGroup.habitId],
    references: [habit.id],
  }),
  members: many(groupMember),

  groupExecutionsLogs: many(executionLogs),
}));
