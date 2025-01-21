import * as React from 'react';
import {
  Users,
  Plus,
  Settings,
  LogOut,
  Home,
  ChevronDown,
  User2Icon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from '@/components/ui/sidebar';
import { USER_PROFILE_CONTEXT } from '@/context/Contexts';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { HabitGroup } from '@/types';

export enum SidebarMenuItems {
  Home = 'Home',
  Profile = 'Profile',
  Groups = 'Groups',
}
type MainSidebarProps = {
  groups: HabitGroup[];
  selectedDisplay: SidebarMenuItems | number;
  setSelectedDisplay: React.Dispatch<
    React.SetStateAction<number | SidebarMenuItems>
  >;
};
export function MainSidebar({
  groups,
  selectedDisplay,
  setSelectedDisplay,
}: MainSidebarProps) {
  const { userProfile } = React.useContext(USER_PROFILE_CONTEXT);

  return (
    <Sidebar
      className="bg-[#6B9B84]"
      collapsible="icon"
      variant="sidebar"
      style={
        {
          '--sidebar-background': '#639780',
          '--sidebar-foreground': '#F5FFF7',
          // '--sidebar-border': '255 255 255 / 0.1',
          // '--sidebar-accent': '255 255 255 / 0.1',
          // '--sidebar-accent-foreground': '255 255 255',
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="p-4">
        <div className="w-full">
          <img
            src={userProfile?.profilePicture}
            alt="Profile"
            className="mx-auto rounded-full outline-4 outline-gray-300/40 outline-offset-8 size-20"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={selectedDisplay === SidebarMenuItems.Home}
              className="hover:bg-white/20 data-[active=true]:bg-white/30 py-5 rounded-lg text-background"
              tooltip="Home"
              onClick={() => setSelectedDisplay(SidebarMenuItems.Home)}
            >
              <a href="#" className="ml-2 text-xl">
                <Home className="size-10" />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Collapsible className="space-y-2 w-auto max-w-full">
              <CollapsibleTrigger className="w-full">
                <SidebarMenuButton
                  asChild
                  isActive={selectedDisplay === SidebarMenuItems.Groups}
                  className="hover:bg-white/20 data-[active=true]:bg-white/30 py-5 rounded-lg text-background"
                  tooltip="Home"
                  onClick={() => setSelectedDisplay(SidebarMenuItems.Groups)}
                >
                  <a
                    href="#"
                    className="flex justify-between items-center ml-2 text-xl"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="size-6" />
                      <span>Groups</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pl-2">
                {groups.map((group) => (
                  <SidebarMenuSub key={group.id}>
                    <div
                      className={
                        'hover:bg-background/50 px-3 py-2 rounded-md font-mono text-background text-sm' +
                        (selectedDisplay === group.id
                          ? ' bg-background/30'
                          : '')
                      }
                      onClick={() => {
                        setSelectedDisplay(group.id);
                      }}
                    >
                      {group.name}
                    </div>
                  </SidebarMenuSub>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-white/20 data-[active=true]:bg-white/30 py-5 rounded-lg text-background"
              tooltip="Profile"
              onClick={() => setSelectedDisplay(SidebarMenuItems.Profile)}
              isActive={selectedDisplay === SidebarMenuItems.Profile}
            >
              <a href="#" className="ml-2 text-xl">
                <User2Icon className="size-10" />
                <span>Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-white/20 text-white/90"
              tooltip="Settings"
            >
              <a href="#settings">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-white/20 text-white/90"
              tooltip="Sign out"
            >
              <a href="#sign-out">
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail className="bg-white/10" />
    </Sidebar>
  );
}
