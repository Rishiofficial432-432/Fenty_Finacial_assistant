
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
import { 
  Download, 
  Filter, 
  PlusCircle, 
  FileJson, 
  FileSpreadsheet, 
  SearchCheck,
  Bot 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [refresh, setRefresh] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPeriodComparison, setShowPeriodComparison] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
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

  const renderDataInsightsPanel = () => {
    if (!showAdvancedMetrics) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="grid gap-3 xs:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="border-border/40 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileJson className="h-4 w-4 text-blue-500" />
              Data Integrations
            </CardTitle>
            <CardDescription className="text-xs">Connected data sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>CSV Files</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Excel Sheets</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>API Connections</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/40 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <SearchCheck className="h-4 w-4 text-emerald-500" />
              Data Quality
            </CardTitle>
            <CardDescription className="text-xs">Health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Completeness</span>
                <span className="font-medium text-emerald-500">98%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Consistency</span>
                <span className="font-medium text-emerald-500">96%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Freshness</span>
                <span className="font-medium text-amber-500">84%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/40 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-500" />
              AI Insights
            </CardTitle>
            <CardDescription className="text-xs">Generated this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Reports Generated</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Data Analyses</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Forecast Accuracy</span>
                <span className="font-medium text-emerald-500">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/40 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-amber-500" />
              Data Volume
            </CardTitle>
            <CardDescription className="text-xs">Processing metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Rows Processed</span>
                <span className="font-medium">124,532</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Total Files</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Storage Used</span>
                <span className="font-medium">2.4 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <motion.div
      key={refresh}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 w-full max-w-full overflow-hidden"
    >
      <DashboardHeader onRefresh={handleRefresh} refreshCount={refresh} />
      
      <div className="grid gap-3 xs:gap-4 grid-cols-1">
        <PrimaryKpiCards />
      </div>
      
      <div className="grid gap-3 xs:gap-4 grid-cols-1">
        <SecondaryKpiCards />
      </div>
      
      {renderDataInsightsPanel()}
      
      <motion.div variants={containerVariants} className="w-full">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <TabsList className="mb-2 sm:mb-0 h-8">
              <TabsTrigger value="overview" className="text-xs h-7 px-3">Overview</TabsTrigger>
              <TabsTrigger value="investments" className="text-xs h-7 px-3">Investments</TabsTrigger>
              <TabsTrigger value="chat" className="text-xs h-7 px-3">Chat & Reports</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="compare" 
                  checked={showPeriodComparison}
                  onCheckedChange={(checked) => setShowPeriodComparison(!!checked)}
                  className="h-3.5 w-3.5"
                />
                <label htmlFor="compare" className="text-xs text-muted-foreground cursor-pointer">
                  Compare to previous period
                </label>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Checkbox 
                  id="advanced" 
                  checked={showAdvancedMetrics}
                  onCheckedChange={(checked) => setShowAdvancedMetrics(!!checked)}
                  className="h-3.5 w-3.5"
                />
                <label htmlFor="advanced" className="text-xs text-muted-foreground cursor-pointer">
                  Show advanced metrics
                </label>
              </div>
              
              <div className="flex gap-2 ml-auto sm:ml-0">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 hover-lift h-7 text-xs"
                  onClick={() => handleNavigate("/history", "History")}
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 hover-lift h-7 text-xs"
                  onClick={() => toast({
                    title: "Exporting Data",
                    description: "Your financial data is being prepared for download."
                  })}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                
                <Button 
                  size="sm"
                  className="flex items-center gap-1 hover-lift h-7 text-xs"
                  onClick={() => handleNavigate("/developers", "Developers")}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
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
