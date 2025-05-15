import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, LineChart, BarChart, PieChart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

// Sample chat messages for demonstration
type MessageType = {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  hasChart?: boolean;
  chartType?: "line" | "bar" | "pie";
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

export default function Reports() {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      
      // Determine if we should add a chart based on the user's message
      const shouldAddChart = userMessage.content.toLowerCase().includes("chart") || 
                            userMessage.content.toLowerCase().includes("graph") ||
                            userMessage.content.toLowerCase().includes("visual");
      
      let chartType: "line" | "bar" | "pie" | undefined;
      
      if (shouldAddChart) {
        if (userMessage.content.toLowerCase().includes("line")) {
          chartType = "line";
        } else if (userMessage.content.toLowerCase().includes("bar")) {
          chartType = "bar";
        } else if (userMessage.content.toLowerCase().includes("pie")) {
          chartType = "pie";
        } else {
          // Default
          chartType = Math.random() > 0.5 ? "line" : "bar";
        }
      }
      
      const aiMessage: MessageType = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        content: generateAIResponse(userMessage.content, shouldAddChart),
        timestamp: new Date(),
        hasChart: shouldAddChart,
        chartType,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Fix the toast call by adding an id
      toast({
        id: "analysis-complete-" + Date.now(),
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-[calc(100vh-8rem)]"
    >
      <motion.div variants={itemVariants} className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Chat</h1>
        <p className="text-muted-foreground">Chat with AI for insights and generate reports</p>
      </motion.div>
      
      <div className="grid md:grid-cols-4 gap-6 flex-1">
        <div className="md:col-span-3">
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
                        className={`max-w-[75%] rounded-xl p-4 ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        
                        {message.hasChart && (
                          <div className="mt-4 bg-card p-4 rounded-md border">
                            <div className="flex items-center justify-center h-40 bg-muted/50 rounded">
                              {message.chartType === "line" && <LineChart className="w-12 h-12 text-muted-foreground/50" />}
                              {message.chartType === "bar" && <BarChart className="w-12 h-12 text-muted-foreground/50" />}
                              {message.chartType === "pie" && <PieChart className="w-12 h-12 text-muted-foreground/50" />}
                            </div>
                            <p className="text-sm text-center mt-2 text-muted-foreground">
                              {message.chartType === "line" && "Interactive line chart visualization"}
                              {message.chartType === "bar" && "Interactive bar chart visualization"}
                              {message.chartType === "pie" && "Interactive pie chart visualization"}
                            </p>
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
                    placeholder="Ask for financial insights..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Portfolio Summary", "Market Analysis", "Budget Report", "Investment Opportunities", "Risk Assessment"].map((report, idx) => (
                <motion.div 
                  key={report}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: idx * 0.1 } 
                  }}
                >
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Plus className="mr-2 h-4 w-4" />
                    {report}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to format time
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Helper function to generate AI responses
function generateAIResponse(userMessage: string, includeChart: boolean): string {
  const responses = [
    "Based on your financial data, I see a positive trend in your investments over the last quarter. Your diversification strategy seems to be working well.",
    "I've analyzed your portfolio, and there might be opportunities to optimize your asset allocation for better returns while maintaining your risk profile.",
    "Looking at market conditions and your current holdings, you might want to consider rebalancing to take advantage of emerging sectors.",
    "Your expense patterns show some categories where you might be able to reduce spending without impacting your lifestyle significantly.",
    "Based on historical data, your current investment strategy aligns well with your long-term financial goals.",
    "I've noticed some potential tax optimization opportunities in your portfolio that could improve your after-tax returns."
  ];
  
  const chartResponses = [
    "I've prepared a visualization to help you understand these trends better. Here's a chart showing the key data points:",
    "Visual data can make this clearer. Take a look at this chart I've generated based on your financial information:",
    "This chart illustrates the pattern I'm describing so you can see exactly what's happening with your finances:",
    "For better clarity, I've visualized the analysis in this chart:"
  ];
  
  let response = responses[Math.floor(Math.random() * responses.length)];
  
  if (includeChart) {
    response += "\n\n" + chartResponses[Math.floor(Math.random() * chartResponses.length)];
  }
  
  return response;
}
