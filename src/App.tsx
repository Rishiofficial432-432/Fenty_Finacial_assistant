
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoadingScreen } from "@/components/LoadingScreen";
import { UserProvider, useUser, initializeDefaultUser } from "@/context/UserContext";

// Pages
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Developers from "./pages/Developers";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [hasShownLoader, setHasShownLoader] = useState(false);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Initialize default user (for development)
    initializeDefaultUser();
    
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
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton={true} richColors />
        
        {loading && hasShownLoader ? (
          <LoadingScreen onLoadComplete={handleLoadComplete} />
        ) : (
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected App Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
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
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
