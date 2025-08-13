import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, Send, Calendar, CheckCircle, AlertCircle, Users, Clock } from "lucide-react";

export default function MeetingSummary() {
  const meetingData = {
    title: "Q4 Strategic Planning Session",
    date: "Today, 2:00 PM - 3:30 PM",
    attendees: ["Sarah Chen (CFO)", "David Park (CTO)", "Lisa Rodriguez (VP Sales)"],
    keyDecisions: [
      "Approved $2M investment in AI infrastructure",
      "Launch new product line by Q2 2024",
      "Hire 15 additional engineers across teams"
    ],
    actionItems: [
      { task: "Draft budget proposal for AI investment", assignee: "Sarah", due: "Friday", status: "pending" },
      { task: "Create product roadmap timeline", assignee: "David", due: "Next Tuesday", status: "pending" },
      { task: "Begin recruitment for engineering roles", assignee: "Lisa", due: "Next Week", status: "in-progress" }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meeting Summary</h1>
            <p className="text-muted-foreground mt-1">Post-meeting insights and action items</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-executive-accent">
              <Send className="mr-2 h-4 w-4" />
              Send to EA
            </Button>
            <Button className="bg-gradient-accent text-executive-navy">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Follow-up
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Action Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">78%</div>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Follow-up Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">3</div>
              <p className="text-xs text-muted-foreground mt-1">Pending completion</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Meeting Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">9.2/10</div>
              <p className="text-xs text-muted-foreground mt-1">Above average</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Key Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Strategic outcomes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meeting Overview */}
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <ClipboardCheck className="mr-2 h-5 w-5 text-executive-gold" />
                Meeting Overview
              </CardTitle>
              <CardDescription>{meetingData.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Decisions Made</h4>
                <div className="space-y-2">
                  {meetingData.keyDecisions.map((decision, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-executive-teal mt-0.5" />
                      <p className="text-sm text-foreground">{decision}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Attendees</h4>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-executive-teal" />
                  <span className="text-sm text-foreground">{meetingData.attendees.join(", ")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="text-foreground">Action Items</CardTitle>
              <CardDescription>Follow-up tasks and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meetingData.actionItems.map((item, index) => (
                  <div key={index} className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.task}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{item.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{item.due}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          item.status === "pending" 
                            ? "bg-executive-gold text-executive-navy" 
                            : "bg-executive-teal text-white"
                        }
                      >
                        {item.status === "pending" ? "Pending" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meeting Transcript Summary */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="text-foreground">AI-Generated Transcript Highlights</CardTitle>
            <CardDescription>Key moments and decisions automatically extracted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <div className="flex items-start space-x-3">
                  <div className="bg-executive-gold text-executive-navy px-2 py-1 rounded text-xs font-semibold">14:23</div>
                  <div>
                    <p className="text-sm text-foreground">
                      <strong>Decision Point:</strong> "I think we should move forward with the AI infrastructure investment. 
                      Sarah, can you prepare the detailed budget breakdown by Friday?"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Identified as: Strategic Investment Decision</p>
                  </div>
                </div>
              </div>
              <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                <div className="flex items-start space-x-3">
                  <div className="bg-executive-teal text-white px-2 py-1 rounded text-xs font-semibold">14:45</div>
                  <div>
                    <p className="text-sm text-foreground">
                      <strong>Action Item:</strong> "David, let's get that product roadmap timeline ready for next Tuesday's review. 
                      We need to align on the Q2 launch target."
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Identified as: Deliverable Assignment</p>
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