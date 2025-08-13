import { useNavigate } from "react-router-dom";
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

export const DashboardTiles = () => {
  const navigate = useNavigate();

  const tiles = [
    {
      id: "meeting-summary",
      title: "Post-Meeting Summary",
      description: "Process and organize meeting insights",
      icon: ClipboardCheck,
      gradient: "from-executive-teal to-executive-gold",
      stats: { completed: 12, pending: 3 },
      route: "/meeting-summary"
    },
    {
      id: "meeting-brief",
      title: "Pre-Meeting Brief",
      description: "Strategic preparation for upcoming discussions",
      icon: Calendar,
      gradient: "from-executive-gold to-executive-teal",
      stats: { meetings: 5, insights: 8 },
      route: "/meeting-brief"
    },
    {
      id: "idea-capture",
      title: "Idea Capture",
      description: "Quick capture and intelligent categorization",
      icon: Lightbulb,
      gradient: "from-executive-navy to-executive-teal",
      stats: { captured: 24, shortlisted: 7 },
      route: "/idea-capture"
    },
    {
      id: "topic-suggestions",
      title: "Friday Notes & Insights",
      description: "Curated topics and strategic suggestions",
      icon: TrendingUp,
      gradient: "from-executive-charcoal to-executive-gold",
      stats: { suggestions: 6, implemented: 4 },
      route: "/topic-suggestions"
    },
    {
      id: "book-excerpts",
      title: "Book Excerpt Sharing",
      description: "Share wisdom with your network",
      icon: BookOpen,
      gradient: "from-executive-teal to-executive-navy",
      stats: { sent: 18, engaged: 12 },
      route: "/book-excerpts"
    },
    {
      id: "weekly-wrap",
      title: "Weekly Executive Summary",
      description: "Comprehensive week overview and planning",
      icon: FileText,
      gradient: "from-executive-gold to-executive-charcoal",
      stats: { coverage: 95, actions: 8 },
      route: "/weekly-summary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiles.map((tile) => {
        const Icon = tile.icon;
        return (
          <Card 
            key={tile.id}
            className="bg-gradient-card border-executive-accent hover:shadow-premium transition-all duration-300 cursor-pointer group"
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};