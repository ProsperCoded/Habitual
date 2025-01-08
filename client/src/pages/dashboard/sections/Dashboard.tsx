import { MainSidebar } from '@/components/custom/main-sidebar';
import { SearchInput } from '@/components/custom/search';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="flex items-center gap-4 px-6 border-b h-16">
          <SidebarTrigger className="hover:bg-muted text-muted-foreground" />
          <Separator orientation="vertical" className="h-6" />
          <div className="w-full max-w-xl">
            <SearchInput />
          </div>
        </header>
        <main className="flex flex-col gap-6 p-6 h-[calc(100vh-4rem)]">
          <h1 className="font-semibold text-2xl">Favorites</h1>
          {/* Content area intentionally left empty as requested */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
