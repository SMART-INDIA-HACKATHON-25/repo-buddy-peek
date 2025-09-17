import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedBackground } from "@/components/animated-background";
import { AppLayout } from "@/layouts/AppLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadAchievement from "./pages/UploadAchievement";
import MyAchievements from "./pages/MyAchievements";
import Portfolio from "./pages/Portfolio";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <TooltipProvider>
          <BrowserRouter>
            <AnimatedBackground className="min-h-screen">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/upload" element={<UploadAchievement />} />
                  <Route path="/achievements" element={<MyAchievements />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/events" element={<Events />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatedBackground>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
