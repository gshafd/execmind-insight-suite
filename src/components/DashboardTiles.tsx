import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Calendar, 
  ClipboardCheck, 
  Lightbulb, 
  BookOpen, 
  TrendingUp,
  Clock,
  Users,
  FileText,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { VoiceAssistantDialog } from "./VoiceAssistantDialog";

export const DashboardTiles = () => {
  const navigate = useNavigate();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMode, setAssistantMode] = useState<"post-meeting" | "pre-meeting">("post-meeting");

  const tiles = [
    {
      id: "meeting-summary",
      title: "Post-Meeting Summary",
      description: "Board sessions, investor calls, leadership syncs",
      icon: ClipboardCheck,
      gradient: "from-executive-teal to-executive-gold",
      stats: { completed: 8, pending: 2 },
      route: "/meeting-summary"
    },
    {
      id: "meeting-brief",
      title: "Pre-Meeting Brief",
      description: "Client meetings, policy roundtables, townhalls",
      icon: Calendar,
      gradient: "from-executive-gold to-executive-teal",
      stats: { meetings: 5, insights: 12 },
      route: "/meeting-brief"
    },
    {
      id: "idea-capture",
      title: "Strategic Idea Capture",
      description: "Innovation themes, expansion ideas, culture initiatives",
      icon: Lightbulb,
      gradient: "from-executive-navy to-executive-teal",
      stats: { captured: 18, prioritized: 6 },
      route: "/idea-capture"
    },
    {
      id: "topic-suggestions",
      title: "Weekly CEO Insights",
      description: "Employee engagement, competitor watch, market trends",
      icon: TrendingUp,
      gradient: "from-executive-charcoal to-executive-gold",
      stats: { insights: 9, actionable: 5 },
      route: "/topic-suggestions"
    },
    {
      id: "book-excerpts",
      title: "Leadership Excerpt Sharing",
      description: "Strategic insights for culture and performance",
      icon: BookOpen,
      gradient: "from-executive-teal to-executive-navy",
      stats: { sent: 15, engaged: 11 },
      route: "/book-excerpts"
    },
    {
      id: "weekly-wrap",
      title: "Executive Performance Dashboard",
      description: "Revenue KPIs, people metrics, strategic focus",
      icon: FileText,
      gradient: "from-executive-gold to-executive-charcoal",
      stats: { coverage: 98, actions: 12 },
      route: "/weekly-summary"
    }
  ];

  const handleAIAssistant = (e: React.MouseEvent, mode: "post-meeting" | "pre-meeting") => {
    e.stopPropagation();
    setAssistantMode(mode);
    setAssistantOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Card 
              key={tile.id}
              className="bg-gradient-card border-executive-accent hover:shadow-premium transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={() => navigate(tile.route)}
            >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${tile.gradient}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-executive-gold text-executive-navy font-semibold">
                  Active
                </Badge>
              </div>
              <CardTitle className="text-foreground group-hover:text-executive-gold transition-colors">
                {tile.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {tile.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-executive-teal" />
                  <span className="text-foreground">Recent Activity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-executive-gold" />
                  <span className="text-executive-gold font-semibold">
                    {Object.values(tile.stats)[0]}
                  </span>
                </div>
              </div>
              <div className="mt-3 bg-executive-surface p-2 rounded text-xs text-muted-foreground">
                Last updated: 15 minutes ago
              </div>
              
              {/* AI Assistant Buttons */}
              {(tile.id === "meeting-summary" || tile.id === "meeting-brief") && (
                <div className="mt-3">
                  <button
                    className="ai-assistant-button"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#181818',
                      border: '1px solid #2A2A2A',
                      color: '#00E0FF',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 8px #00E0FF40';
                      e.currentTarget.style.borderColor = '#00E0FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#2A2A2A';
                    }}
                    onClick={(e) => handleAIAssistant(e, tile.id === "meeting-summary" ? "post-meeting" : "pre-meeting")}
                  >
                    {tile.id === "meeting-summary" 
                      ? "Ask AI: What happened in this meeting?"
                      : "Ask AI: What should I know before this meeting?"
                    }
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
          );
        })}
      </div>
      
      <VoiceAssistantDialog
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
        mode={assistantMode}
      />
    </>
  );
};