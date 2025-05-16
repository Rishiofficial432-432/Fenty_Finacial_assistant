
import { PieChart, Pie, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, BarChart, Bar, ComposedChart } from "recharts";
import { PieChart as PieChartIcon, ChartLine, BarChart as BarChartIcon, LineChart as LineChartIcon, Activity } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { chartConfig, pieData, timeData, sectorPerformanceData, marketData, comparisonData, riskData } from "./ChartData";
import { ChartTooltipContent } from "@/components/ui/chart";

interface OverviewTabProps {
  animateCharts: boolean;
  onRefresh: () => void;
}

export const OverviewTab = ({ animateCharts, onRefresh }: OverviewTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard
          title="Asset Allocation"
          description="Distribution of your portfolio"
          icon={<PieChartIcon className="h-4 w-4 text-purple-500" />}
          config={chartConfig}
          onRefresh={onRefresh}
        >
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
        </ChartCard>
        
        <ChartCard
          title="Balance Trend"
          description="6-month progress report"
          icon={<ChartLine className="h-4 w-4 text-purple-500" />}
          config={chartConfig}
          onRefresh={onRefresh}
        >
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
        </ChartCard>
        
        <ChartCard
          title="Sector Distribution"
          description="Holdings by market sector"
          icon={<BarChartIcon className="h-4 w-4 text-purple-500" />}
          config={chartConfig}
          onRefresh={onRefresh}
        >
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
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <ChartCard
          title="Asset Performance"
          description="Performance comparison by asset class"
          icon={<LineChartIcon className="h-4 w-4 text-purple-500" />}
          config={chartConfig}
          height="350px"
          onRefresh={onRefresh}
          className="md:col-span-2"
        >
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
        </ChartCard>
        
        <ChartCard
          title="Risk Analysis"
          description="Portfolio risk breakdown"
          icon={<Activity className="h-4 w-4 text-purple-500" />}
          config={chartConfig}
          height="350px"
          onRefresh={onRefresh}
        >
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
        </ChartCard>
      </div>
      
      <div className="mt-6">
        <ChartCard
          title="Projected vs Actual Growth"
          description="5-year financial outlook"
          icon={<LineChartIcon className="h-4 w-4 text-purple-500" />}
          config={chartConfig}
          height="400px"
          onRefresh={onRefresh}
        >
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
        </ChartCard>
      </div>
    </>
  );
};
