import GroupsDisplay from '@/pages/groups/sections/GroupsDisplay';
import Navbar from '@/pages/groups/sections/Navbar';
import React from 'react';

export default function Groups() {
  const [query, setQuery] = React.useState('');
  return (
    <div className="groups">
      <Navbar query={query} setQuery={setQuery} />
      <GroupsDisplay query={query} />
    </div>
  );
}
