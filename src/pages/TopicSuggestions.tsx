import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, CheckCircle, ExternalLink, BookOpen, Lightbulb } from "lucide-react";

export default function TopicSuggestions() {
  const suggestions = [
    {
      id: 1,
      title: "The Rise of Emotional AI in Enterprise Software",
      summary: "How companies are integrating emotional intelligence into their digital products to improve customer experience and employee satisfaction.",
      category: "Technology Trends",
      readTime: "8 min read",
      relevance: "High",
      source: "Harvard Business Review",
      keyInsights: [
        "40% increase in customer satisfaction when emotional AI is implemented",
        "Key applications in customer service and HR management",
        "Ethical considerations and privacy implications"
      ]
    },
    {
      id: 2,
      title: "Strategic Leadership in Times of Uncertainty",
      summary: "Essential frameworks for CEOs navigating market volatility and leading through ambiguous business environments.",
      category: "Leadership",
      readTime: "12 min read",
      relevance: "High",
      source: "McKinsey Insights",
      keyInsights: [
        "Adaptive leadership models for rapid decision-making",
        "Building organizational resilience through uncertainty",
        "Communication strategies for maintaining team confidence"
      ]
    },
    {
      id: 3,
      title: "Sustainable Finance: The New Competitive Advantage",
      summary: "How ESG initiatives are becoming central to corporate strategy and investor relations in the post-pandemic economy.",
      category: "Sustainability",
      readTime: "10 min read",
      relevance: "Medium",
      source: "Bloomberg",
      keyInsights: [
        "ESG-focused companies outperform peers by 15%",
        "Regulatory changes driving sustainable finance adoption",
        "Practical steps for implementing ESG metrics"
      ]
    },
    {
      id: 4,
      title: "The Future of Remote-First Organizations",
      summary: "Examining successful models of distributed teams and the cultural shifts required for long-term remote work success.",
      category: "Organizational Development",
      readTime: "15 min read",
      relevance: "Medium",
      source: "MIT Sloan Review",
      keyInsights: [
        "Best practices from companies with 5+ years remote experience",
        "Technology infrastructure requirements for seamless collaboration",
        "Impact on company culture and employee retention"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Friday Notes & Insights</h1>
            <p className="text-muted-foreground mt-1">AI-curated strategic insights and trending topics</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-executive-accent">
              <BookOpen className="mr-2 h-4 w-4" />
              Reading List
            </Button>
            <Button className="bg-gradient-accent text-executive-navy">
              <Lightbulb className="mr-2 h-4 w-4" />
              Generate Weekly Summary
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Insights Read This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">12</div>
              <p className="text-xs text-muted-foreground mt-1">+4 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Suggestions Implemented</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">6</div>
              <p className="text-xs text-muted-foreground mt-1">Ideas put into action</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Relevance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8.9/10</div>
              <p className="text-xs text-muted-foreground mt-1">AI matching accuracy</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">3.2h</div>
              <p className="text-xs text-muted-foreground mt-1">Research time per week</p>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Topics */}
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="bg-gradient-card border-executive-accent">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-foreground">{suggestion.title}</CardTitle>
                      <Badge 
                        className={
                          suggestion.relevance === "High" 
                            ? "bg-executive-gold text-executive-navy" 
                            : "bg-executive-teal text-white"
                        }
                      >
                        {suggestion.relevance} Relevance
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {suggestion.summary}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-executive-teal" />
                        <span className="text-sm text-executive-teal font-medium">{suggestion.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{suggestion.readTime}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Source: {suggestion.source}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm" className="border-executive-accent">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-executive-accent">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <h4 className="font-semibold text-foreground mb-2">Key Insights</h4>
                  <div className="space-y-2">
                    {suggestion.keyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-executive-gold rounded-full mt-2"></div>
                        <p className="text-sm text-foreground">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Summary Generator */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="text-foreground">Generate Friday Note Summary</CardTitle>
            <CardDescription>Create a comprehensive weekly insight summary for your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">This Week's Focus Areas</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-executive-gold rounded-full"></div>
                      <span className="text-sm text-foreground">Emotional AI implementation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-executive-teal rounded-full"></div>
                      <span className="text-sm text-foreground">Leadership under uncertainty</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-executive-gold rounded-full"></div>
                      <span className="text-sm text-foreground">ESG strategic integration</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Recommended Actions</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-executive-teal" />
                      <span className="text-sm text-foreground">Schedule AI pilot program discussion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-executive-teal" />
                      <span className="text-sm text-foreground">Review remote work policies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-executive-teal" />
                      <span className="text-sm text-foreground">Assess ESG reporting capabilities</span>
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