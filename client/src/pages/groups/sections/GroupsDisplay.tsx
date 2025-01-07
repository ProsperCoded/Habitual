import GroupItem from '@/pages/groups/sections/groupItem';
import { Group } from '@/types';
import React, { useMemo } from 'react';
const groups: Group[] = [
  {
    title: 'Morning Motivation',
    description:
      'A group dedicated to starting your day with positive energy and meditation.',
    interval: 'Daily',
  },
  {
    title: 'Weekly Wellness',
    description:
      'Focus on a new wellness habit each week to enhance your health.',
    interval: 'Weekly',
  },
  {
    title: 'Mindful Monthly',
    description:
      'Monthly challenges to cultivate mindfulness and reduce stress.',
    interval: 'Monthly',
  },
];
export default function GroupsDisplay({ query }: { query: string }) {
  const filteredGroups = query
    ? groups.filter((group) =>
        group.title.toLowerCase().includes(query.toLowerCase()),
      )
    : groups;
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {filteredGroups.map((group, index) => (
        <GroupItem key={index} group={group} />
      ))}
    </div>
  );
}
