
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, ArrowUpRight, FileText } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { ChartCard } from "./ChartCard";
import { investmentData, allocationData, historicalData } from "./ChartData";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const barColors = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"];
const pieColors = ["#8b5cf6", "#ec4899", "#f43f5e", "#06b6d4", "#14b8a6", "#22c55e"];

export const InvestmentsTab = () => {
  const [returnsPeriod, setReturnsPeriod] = useState("month");
  const [allocationView, setAllocationView] = useState("sector");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <ChartCard
            title="Investment Returns"
            description={`Performance for this ${returnsPeriod}`}
            icon={<BarChart3 className="h-4 w-4" />}
            onOptionSelect={setReturnsPeriod}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={investmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="return" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                  {investmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <ChartCard
            title="Asset Allocation"
            description={`By ${allocationView}`}
            icon={<PieChartIcon className="h-4 w-4" />}
            onOptionSelect={setAllocationView}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {allocationData.map((entry, index) => (
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
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible" className="w-full">
        <ChartCard
          title="Historical Performance"
          description="5-year investment growth"
          icon={<LineChartIcon className="h-4 w-4" />}
          height="h-[350px]"
          className="h-full"
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={historicalData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '8px', border: 'none' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="stocks" stroke="#8b5cf6" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="bonds" stroke="#ec4899" />
              <Line type="monotone" dataKey="cash" stroke="#06b6d4" />
              <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </motion.div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="border-border/40 shadow-soft">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-md bg-primary/10 p-2.5">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Investment Documents</CardTitle>
              <CardDescription>Access your reports and statements</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Q1 Performance Report', 'Q2 Performance Report', 'Annual Disclosure', 'Tax Documents'].map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-accent/5">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{doc}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Documents</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
