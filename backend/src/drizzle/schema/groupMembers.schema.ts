import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { habitGroup } from './habitGroup.schema';
import { user } from './users.schema';
export const groupMember = pgTable(
  'groupMembers',
  {
    userId: integer('userId')
      .notNull()
      .references(() => user.id),
    groupId: integer('groupId')
      .notNull()
      .references(() => habitGroup.id),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.groupId],
      name: 'groupMembers_pk',
    }),
  }),
);

// Define relations
export const groupMembersRelations = relations(groupMember, ({ one }) => ({
  user: one(user, {
    fields: [groupMember.userId],
    references: [user.id],
  }),
  group: one(habitGroup, {
    fields: [groupMember.groupId],
    references: [habitGroup.id],
  }),
}));
