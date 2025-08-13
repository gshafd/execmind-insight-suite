import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar, TrendingUp, Users, CheckCircle, AlertTriangle, Target } from "lucide-react";

export default function WeeklySummary() {
  const weeklyData = {
    period: "December 9-15, 2024",
    coverage: 95,
    meetings: 12,
    decisions: 8,
    actionItems: 15,
    completedItems: 12
  };

  const keyHighlights = [
    {
      category: "Strategic Wins",
      items: [
        "Board approved $2M AI infrastructure investment",
        "Q4 revenue exceeded projections by 15%",
        "Successfully closed Series B funding round"
      ]
    },
    {
      category: "Operational Updates",
      items: [
        "Engineering team expanded by 3 senior developers",
        "Customer satisfaction score improved to 8.7/10",
        "Implemented new project management workflow"
      ]
    },
    {
      category: "Market Intelligence",
      items: [
        "Competitor launched similar AI product (monitor impact)",
        "New regulation affecting data privacy (compliance review needed)",
        "Industry growth rate accelerated to 23% YoY"
      ]
    }
  ];

  const upcomingPriorities = [
    { task: "Finalize 2025 strategic plan", due: "Next Friday", priority: "high" },
    { task: "Q4 board presentation preparation", due: "Next Tuesday", priority: "high" },
    { task: "Team holiday event planning", due: "Next Week", priority: "medium" },
    { task: "Annual performance review cycle kickoff", due: "End of Month", priority: "medium" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Weekly Executive Summary</h1>
            <p className="text-muted-foreground mt-1">{weeklyData.period}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-executive-accent">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Review
            </Button>
            <Button className="bg-gradient-accent text-executive-navy">
              <Download className="mr-2 h-4 w-4" />
              Export Summary
            </Button>
          </div>
        </div>

        {/* Week Overview KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Coverage Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">{weeklyData.coverage}%</div>
              <Progress value={weeklyData.coverage} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">{weeklyData.meetings}</div>
              <p className="text-xs text-muted-foreground mt-1">Strategic sessions</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Key Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{weeklyData.decisions}</div>
              <p className="text-xs text-muted-foreground mt-1">Strategic outcomes</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">{weeklyData.actionItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Total generated</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">
                {Math.round((weeklyData.completedItems / weeklyData.actionItems) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Actions completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Key Highlights */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <TrendingUp className="mr-2 h-5 w-5 text-executive-gold" />
              Week Highlights
            </CardTitle>
            <CardDescription>Major achievements and strategic developments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {keyHighlights.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-executive-gold">{section.category}</h4>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-executive-teal mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Priorities */}
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Target className="mr-2 h-5 w-5 text-executive-gold" />
                Next Week Priorities
              </CardTitle>
              <CardDescription>Critical tasks and strategic initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPriorities.map((item, index) => (
                  <div key={index} className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.task}</p>
                        <p className="text-xs text-muted-foreground mt-1">Due: {item.due}</p>
                      </div>
                      <Badge 
                        className={
                          item.priority === "high" 
                            ? "bg-destructive text-destructive-foreground" 
                            : "bg-executive-teal text-white"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Users className="mr-2 h-5 w-5 text-executive-teal" />
                Team Performance Snapshot
              </CardTitle>
              <CardDescription>Key metrics across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Engineering</span>
                    <span className="text-executive-gold">92% velocity</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Sprint goals exceeded, new features deployed</div>
                </div>
                <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Sales</span>
                    <span className="text-executive-teal">108% of target</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Q4 targets exceeded, strong pipeline for Q1</div>
                </div>
                <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Operations</span>
                    <span className="text-foreground">98% efficiency</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Smooth operations, minimal incidents</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <FileText className="mr-2 h-5 w-5 text-executive-gold" />
              Executive Summary
            </CardTitle>
            <CardDescription>AI-generated strategic overview and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <h4 className="font-semibold text-executive-gold mb-2">Strategic Momentum</h4>
                <p className="text-sm text-foreground">
                  This week marked significant progress with the board's approval of AI infrastructure investment 
                  and Q4 performance exceeding expectations. The organization demonstrates strong execution 
                  capability with a 92% action item completion rate and continued revenue growth trajectory.
                </p>
              </div>
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <h4 className="font-semibold text-executive-teal mb-2">Key Risks & Mitigation</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-executive-gold mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground">Competitive AI product launch requires market response strategy</p>
                      <p className="text-xs text-muted-foreground">Recommend accelerating our AI feature timeline</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-executive-teal mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground">New data privacy regulations need compliance review</p>
                      <p className="text-xs text-muted-foreground">Legal team engaged, assessment underway</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}