import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Clock, Download, Mail, Calendar, Target, Zap, DollarSign } from "lucide-react";

const WeeklyWrapUp = () => {
  const weeklyKPIs = [
    {
      title: "Revenue Growth",
      value: "+12.3%",
      trend: "up",
      description: "Week-over-week increase",
      target: "10%",
      achieved: true
    },
    {
      title: "Team Engagement Score",
      value: "8.7/10",
      trend: "up", 
      description: "Based on pulse survey",
      target: "8.5",
      achieved: true
    },
    {
      title: "Decision Turnaround Time",
      value: "2.1 days",
      trend: "down",
      description: "Average time to decision",
      target: "2.5 days",
      achieved: true
    },
    {
      title: "Customer Satisfaction",
      value: "94.2%",
      trend: "up",
      description: "Net Promoter Score",
      target: "92%",
      achieved: true
    }
  ];

  const keyHighlights = [
    {
      category: "Strategic Wins",
      items: [
        "Closed $4.2M partnership deal with TechFlow Industries",
        "Board approved Q1 2026 international expansion plan", 
        "Successfully launched AI customer service pilot"
      ]
    },
    {
      category: "Team Achievements", 
      items: [
        "Engineering team delivered milestone 2 weeks ahead of schedule",
        "Sales team exceeded monthly target by 18%",
        "HR launched new mentorship program with 95% participation"
      ]
    },
    {
      category: "Innovation & Growth",
      items: [
        "Filed 3 new patent applications in AI/ML space",
        "R&D breakthrough in sustainable materials processing",
        "Customer retention improved to 97.3% (highest ever)"
      ]
    }
  ];

  const upcomingFocus = [
    "Q4 Budget Planning & Resource Allocation",
    "Leadership Team Retreat - Strategic Vision 2026",
    "Board Presentation - Innovation Pipeline Review",
    "Annual Performance Review Cycle Launch"
  ];

  const aiInsights = `This week demonstrated exceptional momentum across all key metrics. Your strategic decision to fast-track the AI customer service initiative is already showing early ROI indicators. The team's execution velocity has increased 23% since implementing the new decision framework.

  Key strategic opportunities emerging: (1) European market expansion timing is optimal given current regulatory landscape, (2) The mentorship program is creating unexpected cross-functional innovation, (3) Customer feedback suggests premium service tier demand.

  Watch areas: Engineering capacity approaching 85% utilization - consider strategic hiring acceleration to maintain current momentum.`;

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4 text-green-400" /> : <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-400" : "text-red-400";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-card border-executive-accent rounded-lg p-6 shadow-premium">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Weekly Executive Wrap-up</h1>
              <p className="text-muted-foreground mt-1">Week of August 28 - September 4, 2025</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-accent text-executive-navy">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="border-executive-accent text-foreground">
                <Mail className="mr-2 h-4 w-4" />
                Share via Email
              </Button>
              <Button variant="outline" className="border-executive-accent text-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Recurring
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weeklyKPIs.map((kpi, index) => (
              <Card key={index} className="bg-gradient-card border-executive-accent hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm text-muted-foreground">{kpi.title}</CardTitle>
                    {getTrendIcon(kpi.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getTrendColor(kpi.trend)}`}>{kpi.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                  <div className="flex items-center mt-2">
                    <Target className="h-3 w-3 text-executive-gold mr-1" />
                    <span className="text-xs text-executive-gold">Target: {kpi.target}</span>
                    {kpi.achieved && <Badge className="ml-auto bg-green-500/20 text-green-400 text-xs">✓</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Weekly Highlights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {keyHighlights.map((section, index) => (
              <Card key={index} className="bg-gradient-card border-executive-accent">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    {section.category === "Strategic Wins" && <DollarSign className="mr-2 h-5 w-5 text-executive-gold" />}
                    {section.category === "Team Achievements" && <Users className="mr-2 h-5 w-5 text-executive-teal" />}
                    {section.category === "Innovation & Growth" && <Zap className="mr-2 h-5 w-5 text-executive-gold" />}
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-executive-gold mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI-Generated Executive Summary */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Zap className="mr-2 h-5 w-5 text-executive-gold" />
              ExecMind Strategic Analysis
            </CardTitle>
            <CardDescription>AI-generated insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm text-muted-foreground whitespace-pre-line">
              {aiInsights}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Focus Areas */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Target className="mr-2 h-5 w-5 text-executive-gold" />
              Next Week's Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingFocus.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-2 h-3 w-3 text-executive-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Items */}
        <div className="flex justify-center space-x-4 pt-6">
          <Button size="lg" className="bg-gradient-accent text-executive-navy">
            <Mail className="mr-2 h-4 w-4" />
            Email to Leadership Team
          </Button>
          <Button size="lg" variant="outline" className="border-executive-accent text-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review Meeting
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WeeklyWrapUp;