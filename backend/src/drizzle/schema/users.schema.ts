import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { habitActiveUsers, habit } from './habit.schema';
import { groupMember } from './groupMembers.schema';
import { habitGroup } from './habitGroup.schema';
import { executionLogs } from 'src/drizzle/schema/executionLogs.schema';

export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  profilePicture: text('profile_picture'),
});

export const userRelations = relations(user, ({ one, many }) => ({
  activeHabits: many(habitActiveUsers),
  groups: many(groupMember),
  createdGroups: many(habitGroup),
  createdHabit: many(habit),
  executionLogs: many(executionLogs),
}));
