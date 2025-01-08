import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { USER_PROFILE_CONTEXT } from '@/context/Contexts';
import { HabitGroup } from '@/types';
import { useContext } from 'react';
type groupItemProps = {
  group: HabitGroup;
  joinGroupHandler: (groupId: string) => Promise<void>;
};
export default function groupItem({ group, joinGroupHandler }: groupItemProps) {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const isMember = group.members.some(
    (user) => user.userId === userProfile?.id,
  );
  return (
    <Card className="border-[#EAF5F5] bg-white border overflow-hidden">
      <CardContent className="pt-6">
        <h3 className="mb-2 font-medium text-[#527e6a] text-lg">
          {group.name}
        </h3>
        <p className="mb-2 text-gray-600 text-sm">{group.description}</p>
        <p className="bg-yellow-200/80 p-3 rounded-lg w-fit font-semibold text-primary text-sm">
          Interval: {group.interval.toUpperCase()}
        </p>
      </CardContent>
      <CardFooter className="px-6 pt-2 pb-6">
        {isMember ? (
          <Button className="bg-gray-500 hover:bg-red-500 w-full font-medium text-white">
            Leave Group
          </Button>
        ) : (
          <Button
            className="bg-primary hover:bg-primaryDark w-full font-medium text-white"
            onClick={() => joinGroupHandler(group.id.toString())}
          >
            Join Group
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
