import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Users, DollarSign, Archive, UserPlus, Star } from "lucide-react";

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  aiTags: {
    feasibility: string;
    roiImpact: string;
    peopleAlignment: string;
  };
  submittedBy: string;
  dateSubmitted: string;
  status: "new" | "under-review" | "prioritized" | "archived";
}

const IdeasInbox = () => {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "AI-Powered Customer Service Platform",
      description: "Implement a comprehensive AI system to handle tier-1 customer inquiries, reducing response time by 80% and freeing up human agents for complex issues.",
      category: "Technology",
      priority: "high",
      aiTags: {
        feasibility: "High - 85% confidence",
        roiImpact: "Very High - Est. $2.3M annual savings",
        peopleAlignment: "Medium - Requires upskilling"
      },
      submittedBy: "Dr. Amanda Foster (CTO)",
      dateSubmitted: "2025-09-01",
      status: "new"
    },
    {
      id: "2", 
      title: "Flexible Work Location Program",
      description: "Expand remote work options to include 'work from anywhere' for 6 weeks annually, boosting retention and attracting global talent.",
      category: "People & Culture",
      priority: "medium",
      aiTags: {
        feasibility: "High - 90% confidence",
        roiImpact: "Medium - Est. 15% retention boost",
        peopleAlignment: "Very High - Strong employee support"
      },
      submittedBy: "Maria Rodriguez (Chief People Officer)",
      dateSubmitted: "2025-08-28",
      status: "under-review"
    },
    {
      id: "3",
      title: "Sustainable Supply Chain Initiative",
      description: "Partner with carbon-neutral suppliers and implement circular economy practices to achieve net-zero operations by 2027.",
      category: "Sustainability",
      priority: "high",
      aiTags: {
        feasibility: "Medium - 70% confidence",
        roiImpact: "High - Long-term brand value + cost savings",
        peopleAlignment: "Very High - Aligns with company values"
      },
      submittedBy: "James Thompson (Chief Sustainability Officer)",
      dateSubmitted: "2025-08-25",
      status: "prioritized"
    },
    {
      id: "4",
      title: "Employee Innovation Time Program",
      description: "Allocate 20% of engineer time for passion projects, similar to Google's model, fostering innovation and job satisfaction.",
      category: "Innovation",
      priority: "medium",
      aiTags: {
        feasibility: "Medium - 65% confidence",
        roiImpact: "Medium - Potential breakthrough innovations",
        peopleAlignment: "High - Popular among technical teams"
      },
      submittedBy: "Rachel Green (Innovation Lead)",
      dateSubmitted: "2025-08-20",
      status: "new"
    }
  ]);

  const handleIdeaClick = (idea: Idea) => {
    setSelectedIdea(idea);
  };

  const updateIdeaStatus = (ideaId: string, newStatus: Idea['status']) => {
    setIdeas(prevIdeas => 
      prevIdeas.map(idea => 
        idea.id === ideaId ? { ...idea, status: newStatus } : idea
      )
    );
    setSelectedIdea(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400";
      case "medium": return "bg-yellow-500/20 text-yellow-400";
      case "low": return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-400";
      case "under-review": return "bg-yellow-500/20 text-yellow-400";
      case "prioritized": return "bg-green-500/20 text-green-400";
      case "archived": return "bg-gray-500/20 text-gray-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology": return <TrendingUp className="h-4 w-4" />;
      case "People & Culture": return <Users className="h-4 w-4" />;
      case "Sustainability": return <Lightbulb className="h-4 w-4" />;
      case "Innovation": return <Star className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const newIdeasCount = ideas.filter(idea => idea.status === 'new').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-card border-executive-accent rounded-lg p-6 shadow-premium">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Ideas Inbox</h1>
              <p className="text-muted-foreground mt-1">Strategic innovation pipeline for Crum & Foster</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-executive-gold">{newIdeasCount}</div>
              <div className="text-sm text-muted-foreground">New Ideas</div>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <Card 
              key={idea.id}
              className="bg-gradient-card border-executive-accent hover:shadow-glow transition-all duration-300 cursor-pointer hover-scale"
              onClick={() => handleIdeaClick(idea)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(idea.category)}
                    <div>
                      <CardTitle className="text-foreground">{idea.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Submitted by {idea.submittedBy} • {new Date(idea.dateSubmitted).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(idea.priority)}>
                      {idea.priority}
                    </Badge>
                    <Badge className={getStatusColor(idea.status)}>
                      {idea.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{idea.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-executive-gold font-medium">{idea.category}</span>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-3 w-3 text-green-400" />
                    <span className="text-xs text-green-400">{idea.aiTags.roiImpact.split('-')[0]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Idea Detail Modal */}
        {selectedIdea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
            <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-2xl w-full mx-4 shadow-premium animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedIdea.title}</h3>
                  <p className="text-muted-foreground">{selectedIdea.category} • {selectedIdea.submittedBy}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedIdea(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedIdea.description}</p>
                </div>

                {/* AI Analysis */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">AI Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                      <div className="text-xs text-executive-gold font-medium mb-1">FEASIBILITY</div>
                      <div className="text-sm text-foreground">{selectedIdea.aiTags.feasibility}</div>
                    </div>
                    <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                      <div className="text-xs text-executive-gold font-medium mb-1">ROI IMPACT</div>
                      <div className="text-sm text-foreground">{selectedIdea.aiTags.roiImpact}</div>
                    </div>
                    <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                      <div className="text-xs text-executive-gold font-medium mb-1">PEOPLE ALIGNMENT</div>
                      <div className="text-sm text-foreground">{selectedIdea.aiTags.peopleAlignment}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={() => updateIdeaStatus(selectedIdea.id, 'prioritized')}
                    className="bg-gradient-accent text-executive-navy"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Prioritize Idea
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => updateIdeaStatus(selectedIdea.id, 'under-review')}
                    className="border-executive-accent text-foreground"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign Owner
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => updateIdeaStatus(selectedIdea.id, 'archived')}
                    className="border-executive-accent text-foreground"
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IdeasInbox;