import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Download, Users, Clock, TrendingUp, AlertTriangle, FileText } from "lucide-react";

export default function MeetingBrief() {
  const upcomingMeeting = {
    title: "Board of Directors Q4 Review",
    date: "Tomorrow, 10:00 AM - 12:00 PM",
    attendees: ["Board Members (8)", "Executive Team (5)"],
    lastMeeting: "September 15, 2024",
    keyTopics: [
      "Q4 Financial Performance Review",
      "2024 Strategic Initiative Updates", 
      "2025 Budget Proposal Discussion",
      "Market Expansion Strategy"
    ],
    openItems: [
      { item: "AI Investment ROI Analysis", priority: "high", from: "Last Board Meeting" },
      { item: "Customer Acquisition Cost Trends", priority: "medium", from: "Executive Review" },
      { item: "Competitive Landscape Update", priority: "medium", from: "Strategy Session" }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pre-Meeting Brief</h1>
            <p className="text-muted-foreground mt-1">Strategic preparation for upcoming discussions</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-executive-accent">
              <FileText className="mr-2 h-4 w-4" />
              Generate Talking Points
            </Button>
            <Button className="bg-gradient-accent text-executive-navy">
              <Download className="mr-2 h-4 w-4" />
              Download Brief
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Client Engagement Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">8.7/10</div>
              <Progress value={87} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Action Item Closure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">92%</div>
              <p className="text-xs text-muted-foreground mt-1">Since last meeting</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Strategic Priorities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4</div>
              <p className="text-xs text-muted-foreground mt-1">Key discussion topics</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Preparation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">95%</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for discussion</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meeting Overview */}
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Calendar className="mr-2 h-5 w-5 text-executive-gold" />
                Upcoming Meeting
              </CardTitle>
              <CardDescription>{upcomingMeeting.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Discussion Topics</h4>
                <div className="space-y-2">
                  {upcomingMeeting.keyTopics.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="bg-executive-gold text-executive-navy px-2 py-1 rounded text-xs font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground">{topic}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Expected Attendees</h4>
                <div className="space-y-1">
                  {upcomingMeeting.attendees.map((group, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-executive-teal" />
                      <span className="text-sm text-foreground">{group}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Items from Previous Meetings */}
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="text-foreground">Open Items to Address</CardTitle>
              <CardDescription>Unresolved topics from previous discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeeting.openItems.map((item, index) => (
                  <div key={index} className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.item}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{item.from}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          item.priority === "high" 
                            ? "bg-destructive text-destructive-foreground" 
                            : "bg-executive-teal text-white"
                        }
                      >
                        {item.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Context & Insights */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="text-foreground">Strategic Context & Key Insights</CardTitle>
            <CardDescription>AI-generated briefing based on recent data and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-executive-gold mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Market Performance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Q4 revenue tracking 15% above projections. Customer acquisition costs decreased 
                        by 23% following AI implementation. Strong position for budget discussions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-executive-teal mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Key Challenges</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Engineering talent shortage continues to impact delivery timelines. 
                        Consider addressing recruitment strategy and retention programs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <h4 className="font-semibold text-foreground mb-3">Recommended Talking Points</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-executive-gold rounded-full"></div>
                      <span className="text-sm text-foreground">Highlight AI ROI success stories</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-executive-teal rounded-full"></div>
                      <span className="text-sm text-foreground">Address engineering capacity concerns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-executive-gold rounded-full"></div>
                      <span className="text-sm text-foreground">Present 2025 expansion opportunities</span>
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