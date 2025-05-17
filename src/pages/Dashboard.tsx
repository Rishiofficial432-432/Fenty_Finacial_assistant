
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PrimaryKpiCards, SecondaryKpiCards } from "@/components/dashboard/KpiCardsGrid";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { InvestmentsTab } from "@/components/dashboard/InvestmentsTab";
import { ChatTab } from "@/components/dashboard/ChatTab";
import { containerVariants } from "@/components/dashboard/ChartData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Filter, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [refresh, setRefresh] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPeriodComparison, setShowPeriodComparison] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
    setAnimateCharts(true);
    
    toast({
      title: "Dashboard Refreshed",
      description: "Your financial data has been updated",
    });
    
    setTimeout(() => setAnimateCharts(false), 1500);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setActiveTab("chat");
    
    toast({
      title: "File Uploaded",
      description: `Successfully uploaded ${file.name}`,
    });
  };

  // Navigation handlers
  const handleNavigate = (path: string, label: string) => {
    navigate(path);
    toast({
      title: `Navigating to ${label}`,
      description: `Loading ${label} page...`,
    });
  };

  // Simulate data loading effect
  useEffect(() => {
    setAnimateCharts(true);
    const timer = setTimeout(() => {
      setAnimateCharts(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key={refresh}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 w-full max-w-full overflow-hidden"
    >
      <DashboardHeader onRefresh={handleRefresh} refreshCount={refresh} />
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <PrimaryKpiCards />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <SecondaryKpiCards />
      </div>
      
      <motion.div variants={containerVariants} className="w-full">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList className="mb-2 sm:mb-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="chat">Chat & Reports</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="compare" 
                  checked={showPeriodComparison}
                  onCheckedChange={(checked) => setShowPeriodComparison(!!checked)}
                />
                <label htmlFor="compare" className="text-sm text-muted-foreground cursor-pointer">
                  Compare to previous period
                </label>
              </div>
              
              <div className="flex gap-2 ml-auto sm:ml-0">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 hover-lift"
                  onClick={() => handleNavigate("/history", "History")}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 hover-lift"
                  onClick={() => toast({
                    title: "Exporting Data",
                    description: "Your financial data is being prepared for download."
                  })}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                
                <Button 
                  size="sm"
                  className="flex items-center gap-1 hover-lift"
                  onClick={() => handleNavigate("/developers", "Developers")}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">New Report</span>
                </Button>
              </div>
            </div>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <OverviewTab animateCharts={animateCharts} onRefresh={handleRefresh} />
          </TabsContent>
          
          <TabsContent value="investments" className="mt-0">
            <InvestmentsTab />
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <ChatTab 
              initialTab={uploadedFile ? "chat" : "data"}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
