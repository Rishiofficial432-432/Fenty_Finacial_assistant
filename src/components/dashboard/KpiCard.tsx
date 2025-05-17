
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { TooltipProvider, Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface KpiCardProps {
  title: string;
  value: string;
  change: { value: string; positive: boolean };
  icon: React.ReactNode;
  sparklineData?: any[];
  tooltipText?: string;
}

export const KpiCard = ({ title, value, change, icon, sparklineData, tooltipText }: KpiCardProps) => (
  <Card className="overflow-hidden border-border/40 hover-scale shadow-soft w-full h-full">
    <CardHeader className="pb-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CardTitle className="text-xs text-muted-foreground">{title}</CardTitle>
          {tooltipText && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <div className="ml-1 cursor-help">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="max-w-xs text-xs">{tooltipText}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500">
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex items-end justify-between">
        <div className="flex-shrink-0">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold">{value}</div>
          <div className={`text-xs flex items-center mt-0.5 ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            {change.positive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
            {change.value}
          </div>
        </div>
        {sparklineData && (
          <div className="h-8 sm:h-10 w-14 sm:w-16 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={change.positive ? '#10b981' : '#ef4444'} 
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
