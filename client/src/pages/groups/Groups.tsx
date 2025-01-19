import { getAllHabitGroups, joinHabitGroup } from '@/api/habitGroupApi';
import { MESSAGE_API_CONTEXT } from '@/context/Contexts';
import GroupsDisplay from '@/pages/groups/sections/GroupsDisplay';
import Navbar from '@/pages/groups/sections/Navbar';
import { HabitGroup } from '@/types';
import { useErrorLogger, useMessageApi } from '@/utils/hooks';
import React, { useContext } from 'react';

export default function HabitGroups() {
  const [query, setQuery] = React.useState('');
  const [groups, setGroups] = React.useState<HabitGroup[]>([]); // Initialize with an empty array
  const errorLogger = useErrorLogger();
  const messageApi = useMessageApi();
  const joinGroupHandler = async (groupId: string) => {
    const response = await joinHabitGroup(groupId, errorLogger);

    if (response) {
      messageApi?.success('Successfully joined the group');
      fetchGroups();
    }
  };
  async function fetchGroups() {
    getAllHabitGroups().then((data) => {
      if (!data) return;
      setGroups(data);
    });
  }
  React.useEffect(() => {
    fetchGroups();
  }, []);
  return (
    <div className="groups">
      <Navbar query={query} setQuery={setQuery} />
      <GroupsDisplay
        query={query}
        groups={groups}
        joinGroupHandler={joinGroupHandler}
      />
    </div>
  );
}
