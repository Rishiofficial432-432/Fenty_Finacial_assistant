
import { Filter, Download, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cardVariants } from "./ChartData";

interface DashboardHeaderProps {
  onRefresh: () => void;
  refreshCount: number;
}

export const DashboardHeader = ({ onRefresh, refreshCount }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <motion.div variants={cardVariants}>
        <h1 className="text-3xl font-bold tracking-tight purple-gradient-text">Financial Analytics</h1>
        <p className="text-muted-foreground">Real-time insights and analysis of your financial portfolio</p>
      </motion.div>
      
      <motion.div variants={cardVariants} className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" className="flex items-center gap-2 hover-lift">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-2 hover-lift">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
        <Button size="sm" onClick={onRefresh} className="flex items-center gap-2 hover-lift">
          <RefreshCw className={`h-4 w-4 ${refreshCount > 0 ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </motion.div>
    </div>
  );
};
