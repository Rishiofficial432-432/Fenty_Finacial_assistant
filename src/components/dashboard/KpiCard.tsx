
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
            <LineChart data={sparklineData}>
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
