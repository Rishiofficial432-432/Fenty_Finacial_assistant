import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  X,
  LogOut,
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
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

// Define version number
const APP_VERSION = "1.3.0";

// Set the optimal sidebar widths
const SIDEBAR_EXPANDED_WIDTH = "16rem"; // Reduced from 20rem to 16rem

// Separate the inner content into its own component, which can safely use useSidebar
const AppLayoutContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useSidebar();
  const { toast } = useToast();
  const isCollapsed = state === "collapsed";
  const { user, logout } = useUser();

  // Helper to determine if the route is active
  const isRouteActive = (path: string) => location.pathname === path;

  // Helper for NavLink className
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return isActive 
      ? "font-medium text-sidebar-primary-foreground bg-sidebar-accent rounded-md" 
      : "text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent/40 rounded-md";
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Searching for "${searchQuery}"...`,
      });
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  // Handle navigation to sections
  const handleNavigate = (path: string, label: string) => {
    navigate(path);
    toast({
      title: `Navigating to ${label}`,
      description: `Loading ${label} page...`,
    });
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
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
          width: isCollapsed ? "4rem" : SIDEBAR_EXPANDED_WIDTH, // Using the constant here
        }}
      >
        <SidebarHeader className="flex items-center px-3 py-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center overflow-hidden ${isCollapsed ? "justify-center w-full" : "justify-start"}`}
          >
            <div className={`h-9 w-9 rounded-lg bg-gradient-to-br from-[#9b87f5] to-[#8B5CF6] flex items-center justify-center ${isCollapsed ? "mx-auto" : "mr-2.5"} flex-shrink-0`}>
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold text-gradient">Aveion</span>
            )}
          </motion.div>
          <SidebarTrigger className={`ml-auto flex-shrink-0 text-white hover:text-purple-300 ${isCollapsed ? "hidden" : ""}`}>
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden px-3">
          {!isCollapsed && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-sidebar-foreground/70" />
                <Input
                  placeholder="Quick search..."
                  className="pl-9 h-9 bg-sidebar-accent/20 border-sidebar-border/30 focus-visible:ring-sidebar-primary text-sidebar-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                />
              </div>
            </div>
          )}

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel className="text-left pl-3 text-sidebar-foreground/70 text-xs">Navigation</SidebarGroupLabel>}
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
                      <LayoutDashboard className={`${isCollapsed ? "mx-auto" : "mr-2.5"} h-4 w-4`} />
                      {!isCollapsed && <span className="text-sm">Dashboard</span>}
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
                      <FileText className={`${isCollapsed ? "mx-auto" : "mr-2.5"} h-4 w-4`} />
                      {!isCollapsed && <span className="text-sm">About</span>}
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
                      <Clock className={`${isCollapsed ? "mx-auto" : "mr-2.5"} h-4 w-4`} />
                      {!isCollapsed && <span className="text-sm">History</span>}
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
                      <BookUser className={`${isCollapsed ? "mx-auto" : "mr-2.5"} h-4 w-4`} />
                      {!isCollapsed && <span className="text-sm">Developers</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel className="text-left pl-3 text-sidebar-foreground/70 text-xs">Settings</SidebarGroupLabel>}
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
                      <Cog className={`${isCollapsed ? "mx-auto" : "mr-2.5"} h-4 w-4`} />
                      {!isCollapsed && <span className="text-sm">Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Help" 
                    className={`text-left py-2 ${isCollapsed ? "justify-center px-2" : "px-3"}`}
                    onClick={() => handleNavigate("/about", "Help & Support")}
                  >
                    <HelpCircle className={`${isCollapsed ? "mx-auto" : "mr-2.5"} h-4 w-4`} />
                    {!isCollapsed && <span className="text-sm">Help</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className={`px-3 pb-3 ${isCollapsed ? "flex justify-center" : ""}`}>
            <ThemeToggle />
          </div>
          
          <div className="p-3 mt-auto">
            <div className={`flex items-center p-2 rounded-md bg-sidebar-accent/20 ${isCollapsed ? "justify-center" : ""}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`p-0 h-auto hover:bg-transparent ${isCollapsed ? "w-auto justify-center" : "w-full justify-start flex items-center gap-2"}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-purple-500/20 text-purple-200">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <>
                        <div className="text-left flex-1 overflow-hidden">
                          <p className="text-xs font-medium truncate text-sidebar-foreground">{user?.name || "User"}</p>
                          <p className="text-xs text-sidebar-foreground/70 truncate">{user?.role || "User"}</p>
                        </div>
                        <ChevronDown className="h-3.5 w-3.5 opacity-50 flex-shrink-0 text-sidebar-foreground" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isCollapsed ? "center" : "end"} side={isCollapsed ? "right" : "top"} className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigate("/settings", "Profile Settings")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate("/settings", "Account Settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({
                    title: "Billing Information",
                    description: "Your subscription is active until Dec 31, 2025",
                  })}>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="p-2 text-xs text-muted-foreground">
                    Version {APP_VERSION}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/40 h-14 px-4 sm:px-6 bg-background rounded-tl-3xl">
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
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => toast({
                      title: "Notifications",
                      description: "You have no new notifications",
                    })}
                  >
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleNavigate("/about", "Help & Support")}  
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Help & Resources</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {searchOpen && (
          <div className="border-b border-border/40 p-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search across Aveion AI..."
                className="pl-9 pr-9" 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8 opacity-70 hover:opacity-100"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 sm:p-6 overflow-auto"
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
