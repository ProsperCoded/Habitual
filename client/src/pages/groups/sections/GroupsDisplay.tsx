import GroupItem from '@/pages/groups/sections/groupItem';
import { HabitGroup } from '@/types';
import React, { useMemo } from 'react';

export default function GroupsDisplay({
  query,
  groups,
  joinGroupHandler,
}: {
  query: string;
  groups: HabitGroup[];
  joinGroupHandler: (groupId: string) => Promise<void>;
}) {
  const filteredGroups = query
    ? groups.filter((group) =>
        group.name.toLowerCase().includes(query.toLowerCase()),
      )
    : groups;
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {filteredGroups.map((group, index) => (
        <GroupItem
          key={index}
          group={group}
          joinGroupHandler={joinGroupHandler}
        />
      ))}
    </div>
  );
}
