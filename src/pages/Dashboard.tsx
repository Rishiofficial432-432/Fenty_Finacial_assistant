
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [refresh, setRefresh] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPeriodComparison, setShowPeriodComparison] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
    setAnimateCharts(true);
    setTimeout(() => setAnimateCharts(false), 1500);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setActiveTab("chat");
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
      className="space-y-6"
    >
      <DashboardHeader onRefresh={handleRefresh} refreshCount={refresh} />
      
      <PrimaryKpiCards />
      
      <SecondaryKpiCards />
      
      <motion.div variants={containerVariants}>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="chat">Chat & Reports</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="items-center space-x-2 flex">
                <Checkbox 
                  id="compare" 
                  checked={showPeriodComparison}
                  onCheckedChange={(checked) => setShowPeriodComparison(!!checked)}
                />
                <label htmlFor="compare" className="text-sm text-muted-foreground cursor-pointer">
                  Compare to previous period
                </label>
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
