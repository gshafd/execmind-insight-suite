import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MeetingSummary from "./pages/MeetingSummary";
import MeetingBrief from "./pages/MeetingBrief";
import IdeaCapture from "./pages/IdeaCapture";
import TopicSuggestions from "./pages/TopicSuggestions";
import BookExcerpts from "./pages/BookExcerpts";
import WeeklySummary from "./pages/WeeklySummary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meeting-summary" element={<MeetingSummary />} />
          <Route path="/meeting-brief" element={<MeetingBrief />} />
          <Route path="/idea-capture" element={<IdeaCapture />} />
          <Route path="/topic-suggestions" element={<TopicSuggestions />} />
          <Route path="/book-excerpts" element={<BookExcerpts />} />
          <Route path="/weekly-summary" element={<WeeklySummary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
