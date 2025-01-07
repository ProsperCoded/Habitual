import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
type groupItemProps = {
  group: {
    title: string;
    description: string;
    interval: string;
  };
};
export default function groupItem({ group }: groupItemProps) {
  return (
    <Card className="border-[#EAF5F5] bg-white border overflow-hidden">
      <CardContent className="pt-6">
        <h3 className="mb-2 font-medium text-[#527e6a] text-lg">
          {group.title}
        </h3>
        <p className="mb-2 text-gray-600 text-sm">{group.description}</p>
        <p className="bg-yellow-200/80 p-3 rounded-lg w-fit font-semibold text-primary text-sm">
          Interval: {group.interval.toUpperCase()}
        </p>
      </CardContent>
      <CardFooter className="px-6 pt-2 pb-6">
        <Button className="bg-[#639780] hover:bg-[#527e6a] w-full font-medium text-white">
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
}
