
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ReportTemplates() {
  const reportTemplates = [
    "Portfolio Summary", 
    "Market Analysis", 
    "Budget Report", 
    "Investment Opportunities", 
    "Risk Assessment",
    "Quarterly Review",
    "Performance Metrics",
    "Strategic Planning"
  ];

  const handleTemplateClick = (template: string) => {
    toast({
      title: `${template} Template Selected`,
      description: "Report template loaded into the chat interface.",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Report Templates</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-60px)]">
        <ScrollArea className="h-full pr-2">
          <div className="p-4 space-y-2">
            {reportTemplates.map((report, idx) => (
              <motion.div 
                key={report}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: idx * 0.1 } 
                }}
              >
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left hover-lift"
                  onClick={() => handleTemplateClick(report)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {report}
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
