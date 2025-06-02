import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/views/dashboard-sidebar";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
      <SidebarProvider>
          <div className="flex h-screen w-screen bg-muted">
              <DashboardSidebar />
              <main className="flex-1">
                  {children}
              </main>
          </div>
      </SidebarProvider>
  );
};

export default Layout;