
import React, { ReactElement } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ChartCardProps {
  title: string;
  description: string;
  icon: ReactElement;
  children: ReactElement;
  height?: string;
  config?: any;
  className?: string;
  onOptionSelect?: (option: string) => void;
}

export const ChartCard = ({
  title,
  description,
  icon,
  children,
  height = 'h-[300px]',
  config,
  className = '',
  onOptionSelect,
}: ChartCardProps) => {
  return (
    <Card className={`border-border/40 shadow-soft overflow-hidden ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 p-2 text-primary dark:bg-primary/20">
            {icon}
          </span>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        
        {onOptionSelect && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Show options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onOptionSelect('week')}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOptionSelect('month')}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOptionSelect('year')}>
                This Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className={`${height} px-2`}>{children}</CardContent>
    </Card>
  );
};
