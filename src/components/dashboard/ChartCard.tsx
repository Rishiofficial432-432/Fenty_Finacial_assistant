
import React, { ReactElement } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download } from 'lucide-react';
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
  allowDownload?: boolean;
  onDownload?: () => void;
}

export const ChartCard = ({
  title,
  description,
  icon,
  children,
  height = 'h-[280px]',
  config,
  className = '',
  onOptionSelect,
  allowDownload = false,
  onDownload,
}: ChartCardProps) => {
  return (
    <Card className={`border-border/40 shadow-soft overflow-hidden w-full ${className}`}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1.5">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          <span className="rounded-md bg-primary/10 p-1.5 text-primary dark:bg-primary/20">
            {icon}
          </span>
          <div>
            <CardTitle className="text-sm">
              {title}
            </CardTitle>
            <CardDescription className="text-xs">
              {description}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {allowDownload && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 flex-shrink-0"
              onClick={onDownload}
              title="Download chart data"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="sr-only">Download chart data</span>
            </Button>
          )}
          
          {onOptionSelect && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span className="sr-only">Show options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-sm">
                <DropdownMenuItem onClick={() => onOptionSelect('day')}>
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOptionSelect('week')}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOptionSelect('month')}>
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOptionSelect('quarter')}>
                  This Quarter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOptionSelect('year')}>
                  This Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${height} px-1 sm:px-2 flex items-center justify-center`}>
        {children}
      </CardContent>
    </Card>
  );
};
