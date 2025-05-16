
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { RefreshCw } from "lucide-react";
import React, { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  config: any;
  height?: string;
  lastUpdated?: string;
  onRefresh?: () => void;
}

export const ChartCard = ({
  title,
  description,
  icon,
  children,
  config,
  height = "300px",
  lastUpdated = "Today, 4:30 PM",
  onRefresh
}: ChartCardProps) => {
  return (
    <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={config} className={`h-[${height}]`}>
          {children}
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Last updated: {lastUpdated}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 gap-1 text-xs"
          onClick={onRefresh}
        >
          <RefreshCw className="h-3 w-3" /> Update
        </Button>
      </CardFooter>
    </Card>
  );
};
