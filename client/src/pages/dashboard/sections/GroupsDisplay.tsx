import { useState } from 'react';
import { GroupCard } from '@/components/custom/group-card';
import { GroupDetails } from '@/components/custom/group-details';

const groups = [
  {
    id: 1,
    title: 'Yoga Enthusiasts Group',
    leader: 'Alex Nguyen',
    progress: 47,
    type: 'yoga' as const,
  },
  {
    id: 2,
    title: 'Healthy Eating Habits',
    leader: 'Rachel Lee',
    progress: 62,
    type: 'health' as const,
  },
  {
    id: 3,
    title: 'Fitness Challenges',
    leader: 'Max Rivera',
    progress: 78,
    type: 'fitness' as const,
  },
  {
    id: 4,
    title: 'Mindfulness Practices',
    leader: 'Sophia Chen',
    progress: 90,
    type: 'mindfulness' as const,
  },
];

const selectedGroup = {
  title: 'Morning Routines',
  leader: 'Ella Thompson',
  duration: '30m',
  rating: 4.5,
  description:
    'Join this group to kickstart your morning with energizing routines.',
};

export default function GroupsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex gap-6 p-6 h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4">
        <h1 className="font-semibold text-2xl">My Learning</h1>
        <div className="gap-4 grid">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              {...group}
              isSelected={selected === group.id}
              onClick={() => setSelected(group.id)}
            />
          ))}
        </div>
      </div>
      <div className="md:block hidden border rounded-lg w-[400px]">
        <GroupDetails group={selectedGroup} />
      </div>
    </div>
  );
}
