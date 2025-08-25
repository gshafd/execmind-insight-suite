import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lightbulb, Plus, Tag, TrendingUp, Star, Clock, Save } from "lucide-react";

export default function IdeaCapture() {
  const [newIdea, setNewIdea] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  const recentIdeas = [
    {
      id: 1,
      title: "AI-First Customer Experience Platform",
      description: "Develop an integrated AI platform that personalizes every customer touchpoint, from onboarding to support, increasing retention by 25%",
      category: "Innovation",
      priority: "high",
      date: "2 hours ago",
      tags: ["AI", "Customer Experience", "Revenue Growth"]
    },
    {
      id: 2,
      title: "LATAM Joint Venture Strategy",
      description: "Explore strategic partnerships in Latin America through joint ventures, targeting Mexico and Brazil markets for 2025 expansion",
      category: "Expansion",
      priority: "high",
      date: "Yesterday",
      tags: ["Global Expansion", "Partnerships", "Market Entry"]
    },
    {
      id: 3,
      title: "Leaders as Coaches Program",
      description: "Train 100 managers in coaching methodologies over 6 months to improve employee engagement and retention",
      category: "Culture",
      priority: "medium",
      date: "2 days ago",
      tags: ["Leadership Development", "Employee Engagement", "Culture"]
    }
  ];

  const handleCaptureIdea = () => {
    setIsCapturing(true);
    // Simulate AI processing
    setTimeout(() => {
      setNewIdea("");
      setIsCapturing(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Idea Capture</h1>
            <p className="text-muted-foreground mt-1">Capture, categorize, and prioritize your strategic insights</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-accent text-executive-navy">
                <Plus className="mr-2 h-4 w-4" />
                Capture New Idea
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-executive-charcoal border-executive-accent">
              <DialogHeader>
                <DialogTitle className="text-foreground">Capture Your Idea</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Describe your idea and let ExecMind categorize and prioritize it automatically
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe your idea in detail..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="bg-executive-surface border-executive-accent text-foreground min-h-[120px]"
                />
                <Button 
                  onClick={handleCaptureIdea}
                  disabled={isCapturing || !newIdea}
                  className="w-full bg-gradient-accent text-executive-navy"
                >
                  {isCapturing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-executive-navy mr-2"></div>
                      Processing with AI...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Capture & Categorize
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Ideas Captured This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">24</div>
              <p className="text-xs text-muted-foreground mt-1">+8 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Ideas Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">7</div>
              <p className="text-xs text-muted-foreground mt-1">High priority items</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Implementation Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">31%</div>
              <p className="text-xs text-muted-foreground mt-1">Ideas to execution</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">AI Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">94%</div>
              <p className="text-xs text-muted-foreground mt-1">Categorization accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Ideas */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Lightbulb className="mr-2 h-5 w-5 text-executive-gold" />
              Recent Ideas
            </CardTitle>
            <CardDescription>Your latest captured insights and strategic thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIdeas.map((idea) => (
                <div key={idea.id} className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{idea.title}</h3>
                        <Badge 
                          className={
                            idea.priority === "high" 
                              ? "bg-destructive text-destructive-foreground" 
                              : "bg-executive-teal text-white"
                          }
                        >
                          {idea.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4 text-executive-teal" />
                          <span className="text-sm text-executive-teal font-medium">{idea.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{idea.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {idea.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Analytics */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="text-foreground">Idea Categories & Trends</CardTitle>
            <CardDescription>AI-powered analysis of your innovation patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Product Innovation</span>
                  <TrendingUp className="h-4 w-4 text-executive-gold" />
                </div>
                <div className="text-xl font-bold text-executive-gold">12 ideas</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </div>
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Operations</span>
                  <TrendingUp className="h-4 w-4 text-executive-teal" />
                </div>
                <div className="text-xl font-bold text-executive-teal">8 ideas</div>
                <p className="text-xs text-muted-foreground">+2 this week</p>
              </div>
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Strategic</span>
                  <TrendingUp className="h-4 w-4 text-foreground" />
                </div>
                <div className="text-xl font-bold text-foreground">4 ideas</div>
                <p className="text-xs text-muted-foreground">+1 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}