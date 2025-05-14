
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

// Sample history data
const historyData = [
  {
    id: 1,
    title: "Market Analysis Report",
    date: "2023-05-14",
    type: "report",
    description: "Comprehensive analysis of market trends for Q2 2023"
  },
  {
    id: 2,
    title: "Portfolio Rebalancing",
    date: "2023-05-10",
    type: "action",
    description: "Automatic portfolio rebalancing based on risk tolerance"
  },
  {
    id: 3,
    title: "Investment Strategy Chat",
    date: "2023-05-08",
    type: "chat",
    description: "AI-assisted conversation about diversification strategies"
  },
  {
    id: 4,
    title: "Expense Analysis",
    date: "2023-05-05",
    type: "analysis",
    description: "Breakdown of monthly expenses with category insights"
  },
  {
    id: 5,
    title: "Retirement Projection",
    date: "2023-05-01",
    type: "projection",
    description: "Long-term retirement savings projection and recommendations"
  },
  {
    id: 6,
    title: "Tax Optimization Report",
    date: "2023-04-28",
    type: "report",
    description: "Analysis of tax-saving opportunities based on current portfolio"
  },
  {
    id: 7,
    title: "Risk Assessment",
    date: "2023-04-25",
    type: "analysis",
    description: "Evaluation of portfolio risk factors and exposure"
  }
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredHistory = historyData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Activity History</h1>
        <p className="text-muted-foreground">View your past analyses, reports, and interactions</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={containerVariants} 
        className="space-y-4"
      >
        {filteredHistory.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            custom={index}
            className="animate-fade-in"
          >
            <Card className="hover:shadow-md transition-all duration-300 overflow-hidden border border-border/50">
              <div className={`h-1 ${getTypeColor(item.type)}`}></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {filteredHistory.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-12">
            <p className="text-muted-foreground">No history items match your search.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Helper function to get color based on type
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
