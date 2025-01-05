import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { HabitGroup } from './habitGroup.schema';
import { user } from './users.schema';
export const GroupMembers = pgTable(
  'groupMembers',
  {
    userId: integer('userId')
      .notNull()
      .references(() => user.id),
    groupId: integer('groupId')
      .notNull()
      .references(() => HabitGroup.id),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.groupId],
      name: 'groupMembers_pk',
    }),
  }),
);

// Define relations
export const groupMembersRelations = relations(GroupMembers, ({ one }) => ({
  user: one(user, {
    fields: [GroupMembers.userId],
    references: [user.id],
  }),
  group: one(HabitGroup, {
    fields: [GroupMembers.groupId],
    references: [HabitGroup.id],
  }),
}));
