
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
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  FileText, 
  History, 
  Users, 
  PanelLeft, 
  BellRing, 
  User, 
  Settings, 
  ChevronDown, 
  Search, 
  HelpCircle 
} from "lucide-react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

// Define version number and user data
const APP_VERSION = "1.2.0";
const USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Administrator",
};

// Separate the inner content into its own component, which can safely use useSidebar
const AppLayoutContent = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Helper to determine if the route is active
  const isRouteActive = (path: string) => location.pathname === path;

  // Helper for NavLink className
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "font-medium text-sidebar-primary" : "text-sidebar-foreground/70 hover:text-sidebar-foreground/90";
  };

  return (
    <div className="flex min-h-svh w-full">
      <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r border-sidebar-border shadow-soft">
        <SidebarHeader className="flex items-center justify-between px-2 py-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center overflow-hidden ${isCollapsed ? "mx-auto" : ""}`}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold purple-gradient-text truncate">Fenty</span>
            )}
          </motion.div>
          <SidebarTrigger className={`flex-shrink-0 ${isCollapsed ? "hidden" : ""}`} />
        </SidebarHeader>

        <SidebarContent className="overflow-hidden px-2">
          {!isCollapsed && (
            <div className="pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Quick search..."
                  className="pl-8 h-9 bg-sidebar-accent/50 border-sidebar-border focus-visible:ring-sidebar-ring"
                />
              </div>
            </div>
          )}

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/")} 
                    tooltip="Dashboard" 
                    className={isCollapsed ? "justify-center px-0" : ""}
                  >
                    <NavLink to="/" className={getNavClass}>
                      <Home className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                      {!isCollapsed && <span>Dashboard</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/about")} 
                    tooltip="About" 
                    className={isCollapsed ? "justify-center px-0" : ""}
                  >
                    <NavLink to="/about" className={getNavClass}>
                      <FileText className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                      {!isCollapsed && <span>About</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/history")} 
                    tooltip="History" 
                    className={isCollapsed ? "justify-center px-0" : ""}
                  >
                    <NavLink to="/history" className={getNavClass}>
                      <History className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                      {!isCollapsed && <span>History</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/developers")} 
                    tooltip="Developers" 
                    className={isCollapsed ? "justify-center px-0" : ""}
                  >
                    <NavLink to="/developers" className={getNavClass}>
                      <Users className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                      {!isCollapsed && <span>Developers</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>Settings</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/settings")} 
                    tooltip="Settings" 
                    className={isCollapsed ? "justify-center px-0" : ""}
                  >
                    <NavLink to="/settings" className={getNavClass}>
                      <Settings className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                      {!isCollapsed && <span>Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Help" 
                    className={isCollapsed ? "justify-center px-0" : ""}
                  >
                    <HelpCircle className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                    {!isCollapsed && <span>Help</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className={`px-2 pb-2 ${isCollapsed ? "flex justify-center" : ""}`}>
            <ThemeToggle />
          </div>
          
          <div className="p-2 mt-auto">
            <div className={`flex items-center p-2 rounded-md bg-sidebar-accent/50 ${isCollapsed ? "justify-center" : ""}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`p-0 h-auto hover:bg-transparent ${isCollapsed ? "w-auto justify-center" : "w-full justify-start flex items-center gap-2"}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        {USER.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <>
                        <div className="text-left flex-1 overflow-hidden">
                          <p className="text-xs font-medium truncate">{USER.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{USER.role}</p>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isCollapsed ? "center" : "end"} side={isCollapsed ? "right" : "bottom"} className="w-56">
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
            {isCollapsed && (
              <SidebarTrigger className="h-8 w-8 md:hidden" />
            )}
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
  );
};

// The main AppLayout component now wraps the content with SidebarProvider
export function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
}
