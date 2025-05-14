
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for charts
const pieData = [
  { name: "Stocks", value: 400 },
  { name: "Bonds", value: 300 },
  { name: "Cash", value: 200 },
  { name: "Real Estate", value: 100 },
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
  stocks: { label: "Stocks", theme: { light: "#9b87f5", dark: "#7E69AB" } },
  bonds: { label: "Bonds", theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
  cash: { label: "Cash", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
  realestate: { label: "Real Estate", theme: { light: "#ea384c", dark: "#ea384c" } },
  actual: { label: "Actual", theme: { light: "#9b87f5", dark: "#7E69AB" } },
  projected: { label: "Projected", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
};

export default function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
              <CardTitle>Asset Allocation</CardTitle>
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
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
              <CardTitle>Balance Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" animationDuration={1000} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10">
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="actual" fill="#8884d8" name="actual" animationDuration={1000} />
                  <Bar dataKey="projected" fill="#82ca9d" name="projected" animationDuration={1000} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-3">
          <Card className="overflow-hidden shadow-md transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10">
              <CardTitle>Market Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer config={chartConfig} className="h-[400px]">
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" name="actual" animationDuration={1000} />
                  <Line type="monotone" dataKey="projected" stroke="#82ca9d" name="projected" animationDuration={1000} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
