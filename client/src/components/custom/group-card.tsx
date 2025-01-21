import {
  Bookmark,
  Coffee,
  Dumbbell,
  Salad,
  SpaceIcon as Yoga,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupCardProps {
  title: string;
  leader: string;
  progress: number;
  type: 'yoga' | 'health' | 'fitness' | 'mindfulness';
  isSelected?: boolean;
  onClick?: () => void;
}

const groupIcons = {
  yoga: Yoga,
  health: Salad,
  fitness: Dumbbell,
  mindfulness: Coffee,
};

export function GroupCard({
  title,
  leader,
  progress,
  type,
  isSelected,
  onClick,
}: GroupCardProps) {
  const Icon = groupIcons[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex w-full gap-4 rounded-lg p-4 text-left transition-colors',
        isSelected ? 'bg-[#6B9B84] text-white' : 'hover:bg-[#6B9B84]/10',
      )}
    >
      <div className="flex justify-center items-center bg-muted rounded-lg w-16 h-16">
        <Icon className="w-8 h-8" />
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{leader}</p>
          </div>
          <Bookmark
            className={cn(
              'h-4 w-4',
              isSelected ? 'fill-white text-white' : 'text-muted-foreground',
            )}
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs">{progress}% complete</div>
          <div
            className={cn(
              'h-2 rounded-full',
              isSelected ? 'bg-white/20' : 'bg-muted',
            )}
          >
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isSelected ? 'bg-white' : 'bg-[#6B9B84]',
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}
