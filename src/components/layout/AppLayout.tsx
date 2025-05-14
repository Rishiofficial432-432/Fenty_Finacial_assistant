
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLink } from "react-router-dom";
import { Home, FileText, History, MessageCircle } from "lucide-react";

export function AppLayout() {
  const location = useLocation();

  // Helper to determine if the route is active
  const isRouteActive = (path: string) => location.pathname === path;

  // Helper for NavLink className
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "font-medium" : "text-sidebar-foreground/70";
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <Sidebar variant="sidebar" collapsible="icon" side="left">
          <SidebarHeader className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="text-xl font-bold text-sidebar-foreground">Fenty</span>
            </motion.div>
            <SidebarTrigger />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isRouteActive("/")} tooltip="Dashboard">
                      <NavLink to="/" className={getNavClass}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isRouteActive("/about")} tooltip="About">
                      <NavLink to="/about" className={getNavClass}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>About</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isRouteActive("/history")} tooltip="History">
                      <NavLink to="/history" className={getNavClass}>
                        <History className="mr-2 h-4 w-4" />
                        <span>History</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isRouteActive("/reports")} tooltip="Reports & Chat">
                      <NavLink to="/reports" className={getNavClass}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Reports & Chat</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center px-2">
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex flex-1 flex-col overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
}
