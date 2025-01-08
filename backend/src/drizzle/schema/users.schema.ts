import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { habitActiveUsers, habit } from './habits.schema';
import { GroupMembers } from './groupMembers.schema';
import { habitGroup } from './habitGroup.schema';

export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  profilePicture: text('profile_picture'),
});

export const userRelations = relations(user, ({ one, many }) => ({
  activeHabits: many(habitActiveUsers),
  groups: many(GroupMembers),
  createdGroups: many(habitGroup),
  createdHabit: many(habit),
}));
