import * as React from 'react';
import {
  Users,
  Plus,
  Settings,
  LogOut,
  Home,
  PercentSquareIcon,
  User,
  ChevronsUpDown,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { USER_PROFILE_CONTEXT } from '@/context/Contexts';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Button } from '@/components/ui/button';

export function MainSidebar() {
  const { userProfile } = React.useContext(USER_PROFILE_CONTEXT);

  const navigation = [
    {
      title: 'Home',
      component: (
        <a href="#" className="ml-2 text-xl">
          <Home className="size-10" />
          <span>{'Home'}</span>
        </a>
      ),
      isActive: true,
    },
    {
      title: 'Groups',
      component: (
        <Collapsible
   
          className="space-y-2 w-auto max-w-full"
        >
          <CollapsibleTrigger asChild>
            <a href="#" className="ml-2 text-xl">
              <Users className="size-10" />
              <span>{'Groups'}</span>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </a>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-2">
            <div
              className="hover:bg-background px-3 py-2 border rounded-md font-mono text-sm hover:text-primaryDark transition-colors"
              onClick={() => {}}
            >
              Eating well
            </div>
          </CollapsibleContent>
        </Collapsible>
      ),
    },
    {
      title: 'Profile',
      component: (
        <a href="#" className="ml-2 text-xl">
          <User className="size-10" />
          <span>{'Profile'}</span>
        </a>
      ),
    },
    {
      title: 'Create Habit',
      component: (
        <a href="#" className="ml-2 text-xl">
          <Plus className="size-10" />
          <span>{'Create Habit'}</span>
        </a>
      ),
    },
  ];
  return (
    <Sidebar
      className="bg-[#6B9B84]"
      collapsible="icon"
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
        <img
          src={userProfile?.profilePicture}
          alt="Profile"
          className="place-items-center rounded-full w-16 h-16"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="hover:bg-white/20 data-[active=true]:bg-white/30 py-5 rounded-lg text-background"
                tooltip={item.title}
              >
                {item.component}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
