
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, LineChart, BarChart, PieChart, FileJson } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

// Animation variants
const itemVariants = {
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

// Sample chart colors
const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Message types
export type MessageType = {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  hasChart?: boolean;
  chartType?: "line" | "bar" | "pie";
  chartData?: any[];
  chartConfig?: {
    xKey?: string;
    yKey?: string;
    title?: string;
    keys?: string[];
  };
};

// Initial messages
const initialMessages: MessageType[] = [
  {
    id: "welcome",
    sender: "ai",
    content: "Hi! I'm your financial analysis assistant. How can I help you analyze your data today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

interface ChatInterfaceProps {
  uploadedFile: File | null;
}

export function ChatInterface({ uploadedFile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Parse CSV/Excel data
  const parseCSVData = async (file: File) => {
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(header => header.trim());
      
      const parsedRows = rows.slice(1)
        .filter(row => row.trim() !== '')
        .map(row => {
          const values = row.split(',');
          const rowData: Record<string, any> = {};
          
          headers.forEach((header, index) => {
            // Try to convert to number if possible
            const value = values[index]?.trim();
            const numValue = Number(value);
            rowData[header] = isNaN(numValue) ? value : numValue;
          });
          
          return rowData;
        }).filter(row => Object.values(row).some(value => value !== undefined && value !== ''));
      
      setParsedData(parsedRows);
      setDataColumns(headers);
      
      console.log("Parsed data:", parsedRows);
      console.log("Columns:", headers);
      
      return { data: parsedRows, columns: headers };
    } catch (error) {
      console.error("Error parsing CSV data:", error);
      toast({
        title: "Error parsing file",
        description: "Could not parse the uploaded file. Please check the format.",
        variant: "destructive",
      });
      return { data: [], columns: [] };
    }
  };

  // Handle file upload notification
  useEffect(() => {
    if (uploadedFile) {
      const processFile = async () => {
        const { data, columns } = await parseCSVData(uploadedFile);
        
        if (data.length > 0) {
          const columnsList = columns.join(', ');
          const rowCount = data.length;
          
          const fileMessage: MessageType = {
            id: `system-${Date.now()}`,
            sender: "ai",
            content: `I've analyzed your uploaded file "${uploadedFile.name}" containing ${rowCount} rows of data with the following columns: ${columnsList}. What insights would you like to see from this data?`,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, fileMessage]);
        } else {
          toast({
            title: "Invalid data format",
            description: "The uploaded file doesn't contain valid data. Please check the format and try again.",
            variant: "destructive",
          });
        }
      };
      
      processFile();
    }
  }, [uploadedFile]);

  // Generate chart based on user query and data
  const generateChartFromQuery = (query: string, data: any[]) => {
    if (!data || data.length === 0) {
      return null;
    }
    
    console.log("Generating chart from query:", query);
    console.log("Data sample:", data.slice(0, 2));
    
    // Simple logic to determine chart type and columns to use
    const queryLower = query.toLowerCase();
    let chartType: "line" | "bar" | "pie" = "bar";
    
    if (queryLower.includes("line chart") || queryLower.includes("trend") || queryLower.includes("over time")) {
      chartType = "line";
    } else if (queryLower.includes("pie chart") || queryLower.includes("distribution") || queryLower.includes("breakdown")) {
      chartType = "pie";
    }
    
    // Find numeric columns for Y-axis and categorical for X-axis
    const numericColumns = dataColumns.filter(col => 
      typeof data[0][col] === 'number'
    );
    
    const categoricalColumns = dataColumns.filter(col => 
      typeof data[0][col] === 'string'
    );
    
    // Default selections
    const xKey = categoricalColumns[0] || dataColumns[0];
    const yKey = numericColumns[0] || dataColumns[1];
    
    // Better column selection based on query keywords
    let selectedXKey = xKey;
    let selectedYKey = yKey;
    
    // Try to find columns mentioned in the query
    dataColumns.forEach(col => {
      const colLower = col.toLowerCase();
      if (queryLower.includes(colLower)) {
        if (typeof data[0][col] === 'number') {
          selectedYKey = col;
        } else {
          selectedXKey = col;
        }
      }
    });
    
    // For pie charts, we might need to aggregate the data
    let chartData = data;
    
    if (chartType === "pie") {
      // For pie chart, aggregate data by the categorical column
      const aggregated: Record<string, number> = {};
      data.forEach(item => {
        const key = item[selectedXKey]?.toString() || "Unknown";
        if (!aggregated[key]) {
          aggregated[key] = 0;
        }
        aggregated[key] += Number(item[selectedYKey] || 0);
      });
      
      chartData = Object.entries(aggregated).map(([name, value]) => ({
        name,
        value
      }));
    }
    
    // For bar charts with multiple series
    let keys = [selectedYKey];
    if (chartType === "bar" && numericColumns.length > 1) {
      // If multiple numeric columns and they're mentioned in the query
      const mentionedNumericColumns = numericColumns.filter(col => 
        queryLower.includes(col.toLowerCase())
      );
      
      if (mentionedNumericColumns.length > 1) {
        keys = mentionedNumericColumns;
      } else if (mentionedNumericColumns.length === 0 && numericColumns.length > 1) {
        // If no specific columns mentioned, use the first two numeric columns
        keys = numericColumns.slice(0, 2);
      }
    }
    
    return {
      chartType,
      chartData: chartType === "pie" ? chartData : data.slice(0, 15), // Limit data points for better visualization
      chartConfig: {
        xKey: selectedXKey,
        yKey: selectedYKey,
        title: generateChartTitle(query, selectedXKey, selectedYKey),
        keys
      }
    };
  };
  
  const generateChartTitle = (query: string, xKey: string, yKey: string) => {
    if (query.toLowerCase().includes("show") && query.toLowerCase().includes("chart")) {
      const parts = query.split(/show|chart/i);
      const relevantPart = parts.find(p => p.length > 3) || "";
      return `Chart of ${yKey} by ${xKey}${relevantPart.length > 3 ? ' - ' + relevantPart.trim() : ''}`;
    }
    return `${yKey} by ${xKey}`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse: MessageType = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        content: generateAIResponse(userMessage.content, !!parsedData, uploadedFile),
        timestamp: new Date(),
      };
      
      // If we have parsed data, generate a chart based on the query
      if (parsedData && parsedData.length > 0) {
        const chartInfo = generateChartFromQuery(userMessage.content, parsedData);
        
        if (chartInfo) {
          aiResponse = {
            ...aiResponse,
            hasChart: true,
            chartType: chartInfo.chartType,
            chartData: chartInfo.chartData,
            chartConfig: chartInfo.chartConfig,
          };
        }
      }
      
      setMessages(prev => [...prev, aiResponse]);
      
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your request and provided insights.",
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to download chart data as CSV
  const downloadChartData = (chartData: any[]) => {
    if (!chartData || chartData.length === 0) return;
    
    // Convert to CSV
    const headers = Object.keys(chartData[0]);
    const csvRows = [
      headers.join(','),
      ...chartData.map(row => 
        headers.map(header => {
          const val = row[header];
          return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(',')
      )
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `chart-data-${Date.now()}.csv`);
    document.body.appendChild(link);
    
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Render the appropriate chart based on type and data
  const renderChart = (message: MessageType) => {
    if (!message.hasChart || !message.chartData || message.chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-40 bg-muted/50 rounded">
          {message.chartType === "line" && <LineChart className="w-12 h-12 text-muted-foreground/50" />}
          {message.chartType === "bar" && <BarChart className="w-12 h-12 text-muted-foreground/50" />}
          {message.chartType === "pie" && <PieChart className="w-12 h-12 text-muted-foreground/50" />}
          {!message.chartType && <FileJson className="w-12 h-12 text-muted-foreground/50" />}
        </div>
      );
    }

    const config = message.chartConfig || {};
    const xKey = config.xKey || Object.keys(message.chartData[0])[0];
    const yKey = config.yKey || Object.keys(message.chartData[0])[1];
    const chartTitle = config.title || `${yKey} by ${xKey}`;
    
    if (message.chartType === "line") {
      return (
        <div className="w-full h-64">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">{chartTitle}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => downloadChartData(message.chartData || [])}
            >
              Export Data
            </Button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={message.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={yKey} 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                key={yKey} // Add key prop to fix the warning
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (message.chartType === "bar") {
      const keys = config.keys || [yKey];
      
      return (
        <div className="w-full h-64">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">{chartTitle}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => downloadChartData(message.chartData || [])}
            >
              Export Data
            </Button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={message.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {keys.map((key, index) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (message.chartType === "pie") {
      return (
        <div className="w-full h-64">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">{chartTitle}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => downloadChartData(message.chartData || [])}
            >
              Export Data
            </Button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={message.chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {message.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>AI Financial Analyst</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col h-full">
        <motion.div 
          className="flex-1 overflow-y-auto p-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-xl p-4 ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.hasChart && (
                    <div className="mt-4 bg-card p-4 rounded-md border">
                      {renderChart(message)}
                    </div>
                  )}
                  
                  <div className="text-xs mt-1 opacity-70">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-muted rounded-xl p-4 w-24">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </motion.div>
        
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={parsedData ? "Ask about your data..." : "Ask for financial insights..."}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to format time
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Helper function to generate AI responses
function generateAIResponse(userMessage: string, hasData: boolean, uploadedFile: File | null): string {
  if (hasData) {
    const dataResponses = [
      "Based on your data, I can see several interesting patterns. Let me visualize this for you.",
      "I've analyzed your query and created a visualization that should help answer your question.",
      "Here's what I found in your data. The chart below shows the key information you requested.",
      "Looking at your data, I can provide this visualization to help you understand the patterns.",
      "I've processed your request and created a chart based on your data that highlights the key insights."
    ];
    
    return dataResponses[Math.floor(Math.random() * dataResponses.length)];
  }
  
  const fileResponses = [
    "Based on the data in your uploaded file, I can see several interesting patterns. The quarterly growth shows consistent improvement.",
    "Your uploaded financial data indicates strong performance in Q2, but there are some areas for optimization in Q3.",
    "I've analyzed your uploaded file and found that your investment diversification could be improved. Let me show you some alternatives.",
    "The data you've shared shows a positive cash flow trend, though there are some seasonal variations worth noting."
  ];
  
  const regularResponses = [
    "Based on your financial data, I see a positive trend in your investments over the last quarter. Your diversification strategy seems to be working well.",
    "I've analyzed your portfolio, and there might be opportunities to optimize your asset allocation for better returns while maintaining your risk profile.",
    "Looking at market conditions and your current holdings, you might want to consider rebalancing to take advantage of emerging sectors.",
    "Your expense patterns show some categories where you might be able to reduce spending without impacting your lifestyle significantly.",
    "Based on historical data, your current investment strategy aligns well with your long-term financial goals.",
    "I've noticed some potential tax optimization opportunities in your portfolio that could improve your after-tax returns."
  ];
  
  return uploadedFile 
    ? fileResponses[Math.floor(Math.random() * fileResponses.length)]
    : regularResponses[Math.floor(Math.random() * regularResponses.length)];
}
