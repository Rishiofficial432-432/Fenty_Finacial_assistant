
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { FileUploader } from "@/components/dashboard/FileUploader";
import { ReportTemplates } from "@/components/dashboard/ReportTemplates";
import { useState } from "react";

interface ChatTabProps {
  initialTab?: string;
  uploadedFile: File | null;
  onFileUpload: (file: File) => void;
}

export const ChatTab = ({ initialTab = "chat", uploadedFile, onFileUpload }: ChatTabProps) => {
  const [chatTab, setChatTab] = useState(initialTab);

  return (
    <div className="grid md:grid-cols-4 gap-6 flex-1">
      <div className="md:col-span-3">
        <Tabs 
          value={chatTab} 
          onValueChange={setChatTab} 
          className="w-full mb-4"
        >
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="data">Upload Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-4">
            <ChatInterface uploadedFile={uploadedFile} />
          </TabsContent>
          
          <TabsContent value="data" className="mt-4">
            <FileUploader onFileUpload={onFileUpload} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <ReportTemplates />
      </div>
    </div>
  );
};
