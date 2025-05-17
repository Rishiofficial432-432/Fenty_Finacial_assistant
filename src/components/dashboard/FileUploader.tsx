
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is CSV or Excel
    const validTypes = [
      'text/csv', 
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain' // Also accept text files which might be CSV
    ];
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const isValidExtension = ['csv', 'xls', 'xlsx', 'txt'].includes(fileExtension);
    
    if (!validTypes.includes(file.type) && !isValidExtension) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
    onFileUpload(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <Card className="overflow-hidden shadow-soft border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="h-4 w-4 text-purple-500" />
          Upload Data
        </CardTitle>
        <CardDescription>Upload your financial data file for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".csv,.xlsx,.xls,.txt"
              onChange={handleChange}
            />
            
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3">
                <Upload className="h-6 w-6 text-purple-500" />
              </div>
              
              <div className="text-sm">
                <p className="font-medium">Drop your file here or click to browse</p>
                <p className="text-muted-foreground mt-1">Supports CSV, Excel and TXT files</p>
              </div>
              
              <label htmlFor="file-upload">
                <Button size="sm" variant="outline" className="mt-2" asChild>
                  <span>Select File</span>
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-md">
                <FileText className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
