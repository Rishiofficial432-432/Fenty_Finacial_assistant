
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
import { Home, FileText, History, MessageCircle, PanelLeft, BellRing, User, Settings, ChevronDown, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

// Define version number and user data
const APP_VERSION = "1.2.0";
const USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Administrator",
  avatar: "https://i.pravatar.cc/300"
};

export function AppLayout() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Helper to determine if the route is active
  const isRouteActive = (path: string) => location.pathname === path;

  // Helper for NavLink className
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "font-medium text-sidebar-primary" : "text-sidebar-foreground/70 hover:text-sidebar-foreground/90";
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r border-sidebar-border shadow-soft">
          <SidebarHeader className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold purple-gradient-text">Fenty</span>
            </motion.div>
            <SidebarTrigger />
          </SidebarHeader>

          <SidebarContent>
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Quick search..."
                  className="pl-8 h-9 bg-sidebar-accent/50 border-sidebar-border focus-visible:ring-sidebar-ring"
                />
              </div>
            </div>

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

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Account">
                      <User className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Help">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="px-2 pb-2">
              <ThemeToggle />
            </div>
            
            <div className="p-2 mt-auto">
              <div className="flex items-center p-2 rounded-md bg-sidebar-accent/50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent flex items-center gap-2 w-full justify-start">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center overflow-hidden">
                        <img src={USER.avatar} alt={USER.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left flex-1 overflow-hidden">
                        <p className="text-xs font-medium truncate">{USER.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{USER.role}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="p-2 text-xs text-muted-foreground">
                      Version {APP_VERSION}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-border/40 h-14 px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                <PanelLeft className="h-4 w-4" />
              </Button>
              <nav className="hidden md:flex">
                <ol className="flex items-center gap-1 text-sm">
                  <li>
                    <NavLink to="/" className="text-muted-foreground hover:text-foreground">Home</NavLink>
                  </li>
                  <li className="text-muted-foreground mx-1">/</li>
                  <li>
                    <span className="font-medium">{location.pathname.split("/")[1] || "Dashboard"}</span>
                  </li>
                </ol>
              </nav>
            </div>
            
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <BellRing className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => setSearchOpen(!searchOpen)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Help & Resources</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {searchOpen && (
            <div className="border-b border-border/40 p-2 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search across Fenty Analytics..."
                  className="pl-9 pr-9" 
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1 h-8 w-8 opacity-70 hover:opacity-100"
                  onClick={() => setSearchOpen(false)}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
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
