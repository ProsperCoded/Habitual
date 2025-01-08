import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export function SearchInput() {
  return (
    <div className="relative">
      <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground transform -translate-y-1/2" />
      <Input type="search" placeholder="Search habits" className="pl-10" />
    </div>
  );
}
