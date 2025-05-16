import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, Cell, BarChart, Bar, ComposedChart, Scatter } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ChartLine, PieChart as PieChartIcon, BarChart3, ArrowDown, ArrowUp, Activity, LineChart as LineChartIcon, Download, Filter, RefreshCw, Gem, Wallet, TrendingUp, DollarSign, Target, Clock, BarChart as BarChartIcon, ArrowUpRight, Percent, Building, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { FileUploader } from "@/components/dashboard/FileUploader";
import { ReportTemplates } from "@/components/dashboard/ReportTemplates";
import { Badge } from "@/components/ui/badge";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data for charts
const pieData = [
  { name: "Stocks", value: 400, color: "#9b87f5" },
  { name: "Bonds", value: 300, color: "#8B5CF6" },
  { name: "Cash", value: 200, color: "#0FA0CE" },
  { name: "Real Estate", value: 100, color: "#ea384c" },
];

const timeData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const comparisonData = [
  { name: "2023", actual: 4000, projected: 2400 },
  { name: "2024", actual: 3000, projected: 1398 },
  { name: "2025", actual: 2000, projected: 9800 },
  { name: "2026", actual: 2780, projected: 3908 },
  { name: "2027", actual: 1890, projected: 4800 },
];

const sectorPerformanceData = [
  { name: 'Technology', value: 28.5, fill: '#9b87f5' },
  { name: 'Healthcare', value: 18.2, fill: '#8B5CF6' },
  { name: 'Finance', value: 15.7, fill: '#7E69AB' },
  { name: 'Consumer', value: 12.3, fill: '#6E59A5' },
  { name: 'Energy', value: 9.8, fill: '#0FA0CE' },
  { name: 'Other', value: 15.5, fill: '#ea384c' },
];

const performanceData = [
  { name: 'ROI', value: 78, fill: '#8B5CF6' },
  { name: 'Growth', value: 67, fill: '#9b87f5' },
  { name: 'Yield', value: 85, fill: '#7E69AB' },
];

const monthlyIncomeData = [
  { name: 'Jan', value: 21500 },
  { name: 'Feb', value: 22700 },
  { name: 'Mar', value: 24100 },
  { name: 'Apr', value: 23500 },
  { name: 'May', value: 24800 },
  { name: 'Jun', value: 24350 },
];

const riskData = [
  { name: 'Very Low', value: 15 },
  { name: 'Low', value: 25 },
  { name: 'Medium', value: 35 },
  { name: 'High', value: 20 },
  { name: 'Very High', value: 5 },
];

const marketData = [
  { name: 'Jan', stocks: 4000, bonds: 2400, cash: 2400 },
  { name: 'Feb', stocks: 3000, bonds: 1398, cash: 2210 },
  { name: 'Mar', stocks: 2000, bonds: 9800, cash: 2290 },
  { name: 'Apr', stocks: 2780, bonds: 3908, cash: 2000 },
  { name: 'May', stocks: 1890, bonds: 4800, cash: 2181 },
  { name: 'Jun', stocks: 2390, bonds: 3800, cash: 2500 },
  { name: 'Jul', stocks: 3490, bonds: 4300, cash: 2100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const chartConfig = {
  stocks: { label: "Stocks", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  bonds: { label: "Bonds", theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
  cash: { label: "Cash", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
  realestate: { label: "Real Estate", theme: { light: "#ea384c", dark: "#ea384c" } },
  actual: { label: "Actual", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  projected: { label: "Projected", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
};

interface KpiCardProps {
  title: string;
  value: string;
  change: { value: string; positive: boolean };
  icon: React.ReactNode;
  sparklineData?: any[];
  tooltipText?: string;
}

const KpiCard = ({ title, value, change, icon, sparklineData, tooltipText }: KpiCardProps) => (
  <Card className="overflow-hidden border-border/40 hover-scale shadow-soft">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
          {tooltipText && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <div className="ml-1 cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="w-48 text-xs">{tooltipText}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500">
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-xs flex items-center mt-1 ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            {change.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {change.value}
          </div>
        </div>
        <div className="h-10 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData || timeData.slice(-4)}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={change.positive ? '#10b981' : '#ef4444'} 
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [chatTab, setChatTab] = useState("charts");
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
    setChatTab("chat");
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
          <Button size="sm" onClick={handleRefresh} className="flex items-center gap-2 hover-lift">
            <RefreshCw className={`h-4 w-4 ${refresh > 0 ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </motion.div>
      </div>
      
      <motion.div variants={cardVariants} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Assets"
          value="$1,245,600"
          change={{ value: "8.2% this month", positive: true }}
          icon={<Wallet className="h-4 w-4" />}
          sparklineData={[
            { name: 'Apr', value: 1150000 },
            { name: 'May', value: 1180000 },
            { name: 'Jun', value: 1200000 },
            { name: 'Jul', value: 1245600 },
          ]}
          tooltipText="Sum of all assets in your portfolio including stocks, bonds, cash, and real estate"
        />
        
        <KpiCard
          title="Monthly Income"
          value="$24,350"
          change={{ value: "3.1% this month", positive: true }}
          icon={<DollarSign className="h-4 w-4" />}
          sparklineData={monthlyIncomeData}
          tooltipText="Total monthly income from all investments including dividends, interest, and rental income"
        />
        
        <KpiCard
          title="Expenses"
          value="$12,780"
          change={{ value: "2.4% this month", positive: false }}
          icon={<BarChart3 className="h-4 w-4" />}
          sparklineData={[
            { name: 'Apr', value: 12200 },
            { name: 'May', value: 12500 },
            { name: 'Jun', value: 12600 },
            { name: 'Jul', value: 12780 },
          ]}
          tooltipText="Total monthly expenses related to investment management and portfolio maintenance"
        />
        
        <KpiCard
          title="ROI"
          value="18.6%"
          change={{ value: "5.3% this year", positive: true }}
          icon={<TrendingUp className="h-4 w-4" />}
          sparklineData={[
            { name: 'Apr', value: 16.2 },
            { name: 'May', value: 17.1 },
            { name: 'Jun', value: 17.9 },
            { name: 'Jul', value: 18.6 },
          ]}
          tooltipText="Return on Investment across your entire portfolio, annualized"
        />
      </motion.div>
      
      <motion.div variants={cardVariants} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Net Worth Growth"
          value="12.4%"
          change={{ value: "1.8% this month", positive: true }}
          icon={<ArrowUpRight className="h-4 w-4" />}
          tooltipText="Year-to-date growth of your total net worth"
        />
        
        <KpiCard
          title="Dividend Yield"
          value="4.2%"
          change={{ value: "0.3% this month", positive: true }}
          icon={<Percent className="h-4 w-4" />}
          tooltipText="Average dividend yield across your dividend-paying investments"
        />
        
        <KpiCard
          title="Asset Utilization"
          value="85.3%"
          change={{ value: "2.1% this month", positive: true }}
          icon={<Target className="h-4 w-4" />}
          tooltipText="Percentage of total assets currently allocated in productive investments"
        />
        
        <KpiCard
          title="Risk Adjusted Return"
          value="7.8"
          change={{ value: "0.6 this month", positive: true }}
          icon={<Activity className="h-4 w-4" />}
          tooltipText="Sharpe ratio measuring return relative to risk taken"
        />
      </motion.div>
      
      <motion.div variants={cardVariants}>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PieChartIcon className="h-4 w-4 text-purple-500" />
                        Asset Allocation
                      </CardTitle>
                      <CardDescription>Distribution of your portfolio</CardDescription>
                    </div>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        isAnimationActive={animateCharts}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChartLine className="h-4 w-4 text-purple-500" />
                        Balance Trend
                      </CardTitle>
                      <CardDescription>6-month progress report</CardDescription>
                    </div>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <AreaChart data={timeData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#9b87f5" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        isAnimationActive={animateCharts}
                        animationDuration={1200} 
                        animationEasing="ease-in-out"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChartIcon className="h-4 w-4 text-purple-500" />
                        Sector Distribution
                      </CardTitle>
                      <CardDescription>Holdings by market sector</CardDescription>
                    </div>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={sectorPerformanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="value" 
                        fill="#9b87f5" 
                        isAnimationActive={animateCharts}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                        radius={[0, 4, 4, 0]}
                      >
                        {sectorPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40 md:col-span-2">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <LineChartIcon className="h-4 w-4 text-purple-500" />
                        Asset Performance
                      </CardTitle>
                      <CardDescription>Performance comparison by asset class</CardDescription>
                    </div>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <ComposedChart data={marketData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar 
                        dataKey="stocks" 
                        barSize={20} 
                        fill="#9b87f5" 
                        isAnimationActive={animateCharts}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                      />
                      <Bar 
                        dataKey="bonds" 
                        barSize={20} 
                        fill="#8B5CF6" 
                        isAnimationActive={animateCharts}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cash" 
                        stroke="#0FA0CE"
                        isAnimationActive={animateCharts} 
                        animationDuration={1500}
                      />
                    </ComposedChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        Risk Analysis
                      </CardTitle>
                      <CardDescription>Portfolio risk breakdown</CardDescription>
                    </div>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[350px]">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        isAnimationActive={animateCharts}
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskData.map((entry, index) => {
                          const colors = ['#10b981', '#34d399', '#fbbf24', '#f97316', '#ef4444'];
                          return <Cell key={`cell-${index}`} fill={colors[index]} />;
                        })}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card className="overflow-hidden shadow-soft border-border/40 hover-lift">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <LineChartIcon className="h-4 w-4 text-purple-500" />
                        Projected vs Actual Growth
                      </CardTitle>
                      <CardDescription>5-year financial outlook</CardDescription>
                    </div>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <LineChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#9b87f5" 
                        name="actual" 
                        strokeWidth={2}
                        isAnimationActive={animateCharts}
                        animationDuration={1500} 
                        dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4, fill: '#fff' }}
                        activeDot={{ r: 6, stroke: '#9b87f5', strokeWidth: 2, fill: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="projected" 
                        stroke="#0FA0CE" 
                        name="projected"
                        strokeWidth={2} 
                        isAnimationActive={animateCharts}
                        animationDuration={1500}
                        strokeDasharray="5 5"
                        dot={{ stroke: '#0FA0CE', strokeWidth: 2, r: 4, fill: '#fff' }}
                        activeDot={{ r: 6, stroke: '#0FA0CE', strokeWidth: 2, fill: '#fff' }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="investments" className="mt-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                  <CardHeader>
                    <CardTitle>Investment Portfolio</CardTitle>
                    <CardDescription>
                      Top performing assets in your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Amazon (AMZN)", type: "Stock", value: "$128,450", change: "+12.4%", sector: "Technology" },
                        { name: "Apple (AAPL)", type: "Stock", value: "$95,200", change: "+8.7%", sector: "Technology" },
                        { name: "U.S. Treasury Bonds", type: "Bond", value: "$75,000", change: "+3.2%", sector: "Government" },
                        { name: "Vanguard Total Market ETF", type: "ETF", value: "$45,780", change: "+6.8%", sector: "Diversified" },
                        { name: "Real Estate Property", type: "Real Estate", value: "$320,000", change: "+4.5%", sector: "Real Estate" }
                      ].map((asset, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card/60 hover:bg-card/80 transition-colors border border-border/40">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-primary/10">
                              {asset.type === "Stock" && <Building className="h-4 w-4 text-primary" />}
                              {asset.type === "Bond" && <Briefcase className="h-4 w-4 text-primary" />}
                              {asset.type === "ETF" && <PieChartIcon className="h-4 w-4 text-primary" />}
                              {asset.type === "Real Estate" && <Home className="h-4 w-4 text-primary" />}
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-xs text-muted-foreground">{asset.sector}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{asset.value}</div>
                            <div className="text-xs text-green-500">{asset.change}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
                    <Button size="sm">View All Assets</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card className="overflow-hidden shadow-soft hover-lift border-border/40 h-full">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Scheduled financial activities</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <ScrollArea className="h-[360px]">
                      <div className="space-y-2 px-6">
                        {[
                          { title: "Dividend Payment", date: "May 18", desc: "AAPL quarterly dividend", icon: <DollarSign className="h-4 w-4" /> },
                          { title: "Bond Maturity", date: "May 24", desc: "Treasury bond maturity", icon: <Briefcase className="h-4 w-4" /> },
                          { title: "Portfolio Review", date: "May 30", desc: "Scheduled advisor meeting", icon: <FileText className="h-4 w-4" /> },
                          { title: "Market Report", date: "June 2", desc: "Q2 market analysis", icon: <BarChart3 className="h-4 w-4" /> },
                          { title: "Rebalancing", date: "June 10", desc: "Portfolio rebalancing", icon: <RefreshCw className="h-4 w-4" /> },
                          { title: "Tax Payment", date: "June 15", desc: "Quarterly tax payment due", icon: <DollarSign className="h-4 w-4" /> },
                        ].map((event, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                            <div className="mt-0.5 p-2 rounded-full bg-primary/10 text-primary">
                              {event.icon}
                            </div>
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-xs text-muted-foreground">{event.desc}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{event.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Showing next 30 days</span>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <RefreshCw className="h-3 w-3" /> Update
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <div className="grid md:grid-cols-4 gap-6 flex-1">
              <div className="md:col-span-3">
                <Tabs 
                  value={chatTab} 
                  onValueChange={setChatTab} 
                  className="w-full mb-4"
                >
                  <TabsList>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="data">Upload Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="mt-4">
                    <ChatInterface uploadedFile={uploadedFile} />
                  </TabsContent>
                  
                  <TabsContent value="data" className="mt-4">
                    <FileUploader onFileUpload={handleFileUpload} />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <ReportTemplates />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

// Add missing icon component
const Home = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
