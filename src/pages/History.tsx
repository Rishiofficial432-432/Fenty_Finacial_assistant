
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Filter, Calendar, Download, ChevronDown, Clock, Check, X, AlertCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Sample history data with enhanced attributes
const historyData = [
  {
    id: 1,
    title: "Market Analysis Report",
    date: "2023-05-14",
    time: "14:32",
    type: "report",
    status: "completed",
    description: "Comprehensive analysis of market trends for Q2 2023",
    tags: ["Market", "Analysis", "Q2"]
  },
  {
    id: 2,
    title: "Portfolio Rebalancing",
    date: "2023-05-10",
    time: "10:15",
    type: "action",
    status: "completed",
    description: "Automatic portfolio rebalancing based on risk tolerance",
    tags: ["Portfolio", "Rebalancing", "Automatic"]
  },
  {
    id: 3,
    title: "Investment Strategy Chat",
    date: "2023-05-08",
    time: "16:45",
    type: "chat",
    status: "completed",
    description: "AI-assisted conversation about diversification strategies",
    tags: ["AI", "Chat", "Strategy"]
  },
  {
    id: 4,
    title: "Expense Analysis",
    date: "2023-05-05",
    time: "09:20",
    type: "analysis",
    status: "pending",
    description: "Breakdown of monthly expenses with category insights",
    tags: ["Expense", "Analysis", "Monthly"]
  },
  {
    id: 5,
    title: "Retirement Projection",
    date: "2023-05-01",
    time: "11:05",
    type: "projection",
    status: "completed",
    description: "Long-term retirement savings projection and recommendations",
    tags: ["Retirement", "Projection", "Planning"]
  },
  {
    id: 6,
    title: "Tax Optimization Report",
    date: "2023-04-28",
    time: "15:30",
    type: "report",
    status: "failed",
    description: "Analysis of tax-saving opportunities based on current portfolio",
    tags: ["Tax", "Optimization", "Savings"]
  },
  {
    id: 7,
    title: "Risk Assessment",
    date: "2023-04-25",
    time: "13:45",
    type: "analysis",
    status: "completed",
    description: "Evaluation of portfolio risk factors and exposure",
    tags: ["Risk", "Assessment", "Portfolio"]
  }
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Filter data based on search term, type, and status
  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight purple-gradient-text">Activity History</h1>
        <p className="text-muted-foreground">View, search, and filter your past analyses, reports, and interactions</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="shadow-soft border-border/40 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Search & Filter</CardTitle>
            <CardDescription>Find specific activities or filter by type and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, description, or tag..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 hover-lift">
                      <Filter className="h-4 w-4" />
                      <span>Type</span>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px]">
                    <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["all", "report", "action", "chat", "analysis", "projection"].map((type) => (
                      <DropdownMenuItem 
                        key={type} 
                        className="capitalize flex items-center gap-2" 
                        onClick={() => setSelectedType(type)}
                      >
                        {type === selectedType && <Check className="h-3 w-3 text-purple-500" />}
                        <span className={type === selectedType ? "font-medium" : ""}>{type}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 hover-lift">
                      <Clock className="h-4 w-4" />
                      <span>Status</span>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px]">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["all", "completed", "pending", "failed"].map((status) => (
                      <DropdownMenuItem 
                        key={status} 
                        className="capitalize flex items-center gap-2" 
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status === selectedStatus && <Check className="h-3 w-3 text-purple-500" />}
                        <span className={status === selectedStatus ? "font-medium" : ""}>{status}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 hover-lift">
                      <Calendar className="h-4 w-4" />
                      <span>Date Range</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Select date range</h4>
                      <div className="flex items-center gap-2">
                        <div className="grid gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="last7" />
                            <label htmlFor="last7" className="text-sm cursor-pointer">Last 7 days</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="last30" />
                            <label htmlFor="last30" className="text-sm cursor-pointer">Last 30 days</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="custom" />
                            <label htmlFor="custom" className="text-sm cursor-pointer">Custom range</label>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">Apply</Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button variant="outline" size="sm" className="ml-auto sm:ml-0 hover-lift">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {filteredHistory.length} {filteredHistory.length === 1 ? 'result' : 'results'} found
        </p>
        
        <div className="flex-1 border-t border-border/40"></div>
        
        <Tabs defaultValue="list" className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="text-xs px-3">List View</TabsTrigger>
            <TabsTrigger value="card" className="text-xs px-3">Card View</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>
      
      <motion.div 
        variants={containerVariants} 
        className="space-y-4"
      >
        <Tabs defaultValue="list" className="w-full">
          <TabsContent value="list" className="mt-0 space-y-4">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={index}
                className="animate-fade-in"
              >
                <Card className="hover-lift transition-all duration-300 border-border/40 shadow-soft">
                  <div className="flex items-center justify-between p-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                      <div className={`${getStatusColor(item.status)} p-2 rounded-full`}>
                        {getStatusIcon(item.status)}
                      </div>
                      <div>
                        <h3 className="text-base font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()} • {item.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full ${getTypeStyle(item.type)}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="pt-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="card" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  custom={index}
                  className="animate-fade-in"
                >
                  <Card className="hover-lift border-border/40 h-full flex flex-col shadow-soft">
                    <div className={`h-2 ${getTypeColor(item.type)}`}></div>
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleDateString()} • {item.time}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-3 pt-0 border-t border-border/40 mt-auto">
                      <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-secondary/50">
                        View Details
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {filteredHistory.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-1">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Helper functions for styling
function getTypeColor(type: string): string {
  switch (type) {
    case "report":
      return "bg-gradient-to-r from-blue-500 to-blue-400";
    case "action":
      return "bg-gradient-to-r from-green-500 to-green-400";
    case "chat":
      return "bg-gradient-to-r from-purple-500 to-purple-400";
    case "analysis":
      return "bg-gradient-to-r from-orange-500 to-orange-400";
    case "projection":
      return "bg-gradient-to-r from-cyan-500 to-cyan-400";
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-400";
  }
}

function getTypeStyle(type: string): string {
  switch (type) {
    case "report":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "action":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "chat":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    case "analysis":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
    case "projection":
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}

function getStatusBadge(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "failed":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
    case "failed":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    default:
      return "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4" />;
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "failed":
      return <X className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
}
