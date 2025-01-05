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
import { relations } from 'drizzle-orm';
import { habit } from './habits.schema';
import { user } from './users.schema';
import { GroupMembers } from './groupMembers.schema';
export const groupState = pgEnum('groupState', ['private', 'public']);
// Habit group table
function getDefaultDate() {
  return new Date().toISOString().split('T')[0];
}

function getDefaultTime() {
  return new Date().toTimeString().split(' ')[0];
}

export const HabitGroup = pgTable('habitGroup', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  groupState: groupState('groupState').notNull(),
  habitId: integer('habitId').references(() => habit.id),
  startDate: date('startDate').default(getDefaultDate()).notNull(),
  startTime: time('startTime').default(getDefaultTime()).notNull(),
  interval: interval('interval').default('1 day').notNull(),
  creatorId: integer('creatorId')
    .notNull()
    .references(() => user.id),
});

// Define relation
export const habitGroupRelations = relations(HabitGroup, ({ one, many }) => ({
  creator: one(user, {
    fields: [HabitGroup.creatorId],
    references: [user.id],
  }),
  habit: one(habit, {
    fields: [HabitGroup.habitId],
    references: [habit.id],
  }),
  members: many(GroupMembers),
}));
