
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  duration?: number;
}

export function LoadingScreen({ onLoadComplete, duration = 10000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (now < endTime) {
        requestAnimationFrame(updateProgress);
      } else {
        onLoadComplete();
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [duration, onLoadComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 mb-8">
        <div className="h-full w-full rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <span className="text-white font-bold text-4xl">F</span>
        </div>
      </div>
      
      <motion.div 
        className="text-2xl font-bold purple-gradient-text mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Fenty Analytics
      </motion.div>
      
      <div className="w-64 h-2 bg-purple-100 dark:bg-purple-900/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-purple-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <Loader className="animate-spin h-4 w-4 mr-2" />
        <span>Loading your dashboard...</span>
      </div>
    </motion.div>
  );
}
