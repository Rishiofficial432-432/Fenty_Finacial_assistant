
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

export function ReportTemplates() {
  const reportTemplates = [
    "Portfolio Summary", 
    "Market Analysis", 
    "Budget Report", 
    "Investment Opportunities", 
    "Risk Assessment"
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
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
