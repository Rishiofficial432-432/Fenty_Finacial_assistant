
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoadingScreen } from "@/components/LoadingScreen";

// Pages
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Developers from "./pages/Developers";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [hasShownLoader, setHasShownLoader] = useState(false);

  useEffect(() => {
    // Only show the loader the first time the app loads
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setLoading(false);
    } else {
      setHasShownLoader(true);
      // We'll let the loader component handle the timing
    }
  }, []);

  const handleLoadComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton={true} richColors />
        
        {loading && hasShownLoader ? (
          <LoadingScreen onLoadComplete={handleLoadComplete} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="about" element={<About />} />
                <Route path="history" element={<History />} />
                <Route path="developers" element={<Developers />} />
                <Route path="settings" element={<Settings />} />
                {/* Fallback for any nested routes */}
                <Route path="*" element={<NotFound />} />
              </Route>
              {/* Global fallback for all routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
