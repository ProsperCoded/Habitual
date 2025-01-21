import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Clock, Coffee, Star } from 'lucide-react';

interface GroupDetailsProps {
  group: {
    title: string;
    leader: string;
    duration: string;
    rating: number;
    description: string;
  };
}

export function GroupDetails({ group }: GroupDetailsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center items-center bg-muted rounded-lg aspect-video">
        <Coffee className="w-24 h-24 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="space-y-1">
          <h2 className="font-semibold text-2xl">{group.title}</h2>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{group.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{group.rating}/5.0</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {group.leader
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{group.leader}</div>
            <div className="text-muted-foreground">Group Leader</div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Group Details</h3>
          <p className="text-muted-foreground text-sm">{group.description}</p>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <Button className="bg-[#6B9B84] hover:bg-[#6B9B84]/90">
            Join group
          </Button>
          <Button variant="outline">Learn more</Button>
        </div>
      </div>
    </div>
  );
}
