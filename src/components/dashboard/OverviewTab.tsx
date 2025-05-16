
import { useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartLine, PieChart as PieChartIcon, Activity, LineChart as LineChartIcon, ArrowUp, ArrowDown } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { portfolioData, marketData, performanceData, portfolioAllocation } from "./ChartData";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Chart configuration
const chartConfig = {
  stocks: {
    label: "Stocks",
    theme: { light: "#8b5cf6", dark: "#9b87f5" }
  },
  bonds: {
    label: "Bonds",
    theme: { light: "#ec4899", dark: "#f43f5e" }
  },
  cash: {
    label: "Cash",
    theme: { light: "#3b82f6", dark: "#60a5fa" }
  },
  realestate: {
    label: "Real Estate",
    theme: { light: "#10b981", dark: "#34d399" }
  },
  actual: {
    label: "Actual",
    theme: { light: "#8b5cf6", dark: "#9b87f5" }
  },
  projected: {
    label: "Projected",
    theme: { light: "#9ca3af", dark: "#d1d5db" }
  }
};

const pieColors = ["#8b5cf6", "#ec4899", "#14b8a6", "#0ea5e9", "#f59e0b"];

export const OverviewTab = () => {
  const [period, setPeriod] = useState("month");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="lg:col-span-2">
          <ChartCard 
            title="Performance Overview" 
            description={`Portfolio performance this ${period}`} 
            icon={<ChartLine className="h-4 w-4" />} 
            onOptionSelect={setPeriod}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="value" barSize={20} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#10b981" activeDot={{ r: 8 }} />
                <Scatter yAxisId="right" dataKey="target" fill="#f43f5e" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <ChartCard 
            title="Asset Allocation" 
            description="Current portfolio distribution" 
            icon={<PieChartIcon className="h-4 w-4" />}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={portfolioAllocation} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8" 
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {portfolioAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <ChartCard 
            title="Portfolio Growth" 
            description="Historical performance trend" 
            icon={<LineChartIcon className="h-4 w-4" />}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="actual" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" />
                <Line type="monotone" dataKey="projected" stroke="#9ca3af" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <ChartCard 
            title="Market Trends" 
            description="Key market indicators" 
            icon={<Activity className="h-4 w-4" />}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="stocks" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="bonds" stroke="#ec4899" />
                <Line type="monotone" dataKey="crypto" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="border-border/40 shadow-soft">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Assets with highest returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tech Growth Fund", category: "Equity", return: 12.4, change: 2.4 },
                { name: "Green Energy ETF", category: "Sector", return: 9.8, change: 1.1 },
                { name: "AI Innovation Index", category: "Technology", return: 15.2, change: -0.8 },
                { name: "Healthcare Select", category: "Sector", return: 7.5, change: 0.6 }
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{asset.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{asset.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{asset.return}%</p>
                    <div className={`flex items-center gap-1 text-xs ${asset.change > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {asset.change > 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{Math.abs(asset.change)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
