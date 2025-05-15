import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ChartLine, PieChart as PieChartIcon, BarChart3, LineChart as LineChartIcon, Download, Filter, RefreshCw } from "lucide-react";
import { useState } from "react";

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

const performanceData = [
  { name: 'ROI', value: 78, fill: '#8B5CF6' },
  { name: 'Growth', value: 67, fill: '#9b87f5' },
  { name: 'Yield', value: 85, fill: '#7E69AB' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
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

const chartConfig = {
  stocks: { label: "Stocks", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  bonds: { label: "Bonds", theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
  cash: { label: "Cash", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
  realestate: { label: "Real Estate", theme: { light: "#ea384c", dark: "#ea384c" } },
  actual: { label: "Actual", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  projected: { label: "Projected", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
};

const KpiCard = ({ title, value, change, icon }: { title: string; value: string; change: { value: string; positive: boolean }; icon: React.ReactNode }) => (
  <Card className="overflow-hidden border-border/40 hover-scale shadow-soft">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
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
            {change.positive ? '↑' : '↓'} {change.value}
          </div>
        </div>
        <div className="h-8 w-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeData.slice(-4)}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={change.positive ? '#10b981' : '#ef4444'} 
                strokeWidth={2}
                dot={false}
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
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

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
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </motion.div>
      </div>
      
      <motion.div variants={cardVariants} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Assets"
          value="$1,245,600"
          change={{ value: "8.2%", positive: true }}
          icon={<ChartLine className="h-4 w-4" />}
        />
        <KpiCard
          title="Monthly Income"
          value="$24,350"
          change={{ value: "3.1%", positive: true }}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <KpiCard
          title="Expenses"
          value="$12,780"
          change={{ value: "2.4%", positive: false }}
          icon={<PieChartIcon className="h-4 w-4" />}
        />
        <KpiCard
          title="ROI"
          value="18.6%"
          change={{ value: "5.3%", positive: true }}
          icon={<LineChartIcon className="h-4 w-4" />}
        />
      </motion.div>
      
      <motion.div variants={cardVariants}>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="items-center space-x-2 hidden md:flex">
                <Checkbox id="compare" />
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
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4 text-purple-500" />
                    Asset Allocation
                  </CardTitle>
                  <CardDescription>Distribution of your portfolio</CardDescription>
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
                        animationDuration={1000}
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
              </Card>
              
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                <CardHeader className="pb-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChartLine className="h-4 w-4 text-purple-500" />
                    Balance Trend
                  </CardTitle>
                  <CardDescription>6-month progress report</CardDescription>
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
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#9b87f5" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        animationDuration={1000} 
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
                <CardHeader className="pb-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChartLine className="h-4 w-4 text-purple-500" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="20%" 
                      outerRadius="80%" 
                      barSize={10} 
                      data={performanceData}
                    >
                      <RadialBar
                        background
                        dataKey="value"
                        animationDuration={1000}
                      />
                      <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                    </RadialBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card className="overflow-hidden shadow-soft border-border/40 hover-lift">
                <CardHeader className="pb-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LineChartIcon className="h-4 w-4 text-purple-500" />
                    Projected vs Actual Growth
                  </CardTitle>
                  <CardDescription>5-year financial outlook</CardDescription>
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
                        animationDuration={1000} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="projected" 
                        stroke="#0FA0CE" 
                        name="projected"
                        strokeWidth={2} 
                        animationDuration={1000}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="investments">
            <Card className="shadow-soft border-border/40">
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>
                  Select a tab to view different investment data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Investment data is being loaded. This tab would show detailed investment performance,
                  allocation, and recommendations for portfolio optimization.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses">
            <Card className="shadow-soft border-border/40">
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
                <CardDescription>
                  Monthly expense breakdown and categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Expense data is being loaded. This tab would show detailed expense tracking,
                  category breakdown, and suggestions for cost optimization.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
