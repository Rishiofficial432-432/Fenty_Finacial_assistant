
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
import { LOGO_PATH } from "@/assets/paths";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLink } from "react-router-dom";
import { 
  FileText, 
  History, 
  ChevronDown, 
  Search, 
  HelpCircle, 
  BellRing,
  Menu,
  LayoutDashboard,
  Clock,
  BookUser,
  Cog,
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
    return isActive 
      ? "font-medium text-sidebar-primary-foreground bg-sidebar-accent rounded-md" 
      : "text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent/40 rounded-md";
  };

  return (
    <div className="flex min-h-svh w-full">
      <Sidebar 
        variant="sidebar" 
        collapsible="icon" 
        side="left" 
        className="border-r border-sidebar-border shadow-soft rounded-r-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A1F2C 0%, #262D40 100%)",
          width: isCollapsed ? "5rem" : "20rem", // Increased width from 18rem to 20rem
        }}
      >
        <SidebarHeader className="flex items-center px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center overflow-hidden ${isCollapsed ? "justify-center w-full pl-0" : "justify-start"}`}
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#9b87f5] to-[#8B5CF6] flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gradient">Aveion</span>
            )}
          </motion.div>
          <SidebarTrigger className={`ml-auto flex-shrink-0 text-white hover:text-purple-300 ${isCollapsed ? "hidden" : ""}`}>
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden px-3">
          {!isCollapsed && (
            <div className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-sidebar-foreground/70" />
                <Input
                  placeholder="Quick search..."
                  className="pl-9 h-9 bg-sidebar-accent/20 border-sidebar-border/30 focus-visible:ring-sidebar-primary text-sidebar-foreground"
                />
              </div>
            </div>
          )}

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel className="text-left pl-3 text-sidebar-foreground/70">Navigation</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/")} 
                    tooltip="Dashboard" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                  >
                    <NavLink to="/" className={getNavClass}>
                      <LayoutDashboard className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                      {!isCollapsed && <span>Dashboard</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/about")} 
                    tooltip="About" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                  >
                    <NavLink to="/about" className={getNavClass}>
                      <FileText className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                      {!isCollapsed && <span>About</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/history")} 
                    tooltip="History" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                  >
                    <NavLink to="/history" className={getNavClass}>
                      <Clock className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                      {!isCollapsed && <span>History</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/developers")} 
                    tooltip="Developers" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                  >
                    <NavLink to="/developers" className={getNavClass}>
                      <BookUser className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                      {!isCollapsed && <span>Developers</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel className="text-left pl-3 text-sidebar-foreground/70">Settings</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isRouteActive("/settings")} 
                    tooltip="Settings" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                  >
                    <NavLink to="/settings" className={getNavClass}>
                      <Cog className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                      {!isCollapsed && <span>Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Help" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                  >
                    <HelpCircle className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                    {!isCollapsed && <span>Help</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className={`px-3 pb-2 ${isCollapsed ? "flex justify-center" : ""}`}>
            <ThemeToggle />
          </div>
          
          <div className="p-3 mt-auto">
            <div className={`flex items-center p-2 rounded-md bg-sidebar-accent/20 ${isCollapsed ? "justify-center" : ""}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`p-0 h-auto hover:bg-transparent ${isCollapsed ? "w-auto justify-center" : "w-full justify-start flex items-center gap-3"}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-purple-500/20 text-purple-200">
                        AJ
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <>
                        <div className="text-left flex-1 overflow-hidden">
                          <p className="text-xs font-medium truncate text-sidebar-foreground">{USER.name}</p>
                          <p className="text-xs text-sidebar-foreground/70 truncate">{USER.role}</p>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 text-sidebar-foreground" />
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
        <div className="flex items-center justify-between border-b border-border/40 h-14 px-4 bg-background rounded-tl-3xl">
          <div className="flex items-center gap-2">
            {isCollapsed && (
              <SidebarTrigger className="h-8 w-8 text-foreground hover:text-purple-500">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
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
                placeholder="Search across Aveion AI..."
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
