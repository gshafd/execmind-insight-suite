import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Send, Search, Users, TrendingUp, Mail, CheckCircle } from "lucide-react";

export default function BookExcerpts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const recentBooks = [
    {
      id: 1,
      title: "The Infinite Game",
      author: "Simon Sinek",
      category: "Leadership",
      excerptsSent: 5,
      engagement: "96%",
      keyTopics: ["Sustainable Leadership", "Purpose-Driven Culture", "Long-term Thinking"]
    },
    {
      id: 2,
      title: "Multipliers",
      author: "Liz Wiseman",
      category: "Leadership Development",
      excerptsSent: 4,
      engagement: "92%",
      keyTopics: ["Talent Development", "Team Amplification", "Leadership Intelligence"]
    },
    {
      id: 3,
      title: "The Culture Catalyst",
      author: "S. Chris Edmonds",
      category: "Organizational Culture",
      excerptsSent: 3,
      engagement: "88%",
      keyTopics: ["Culture Transformation", "Values Alignment", "Performance Culture"]
    }
  ];

  const teamMembers = [
    { name: "Sarah Chen", role: "CFO", department: "Finance" },
    { name: "David Williams", role: "CTO", department: "Technology" },
    { name: "Lisa Zhang", role: "CPO", department: "Product" },
    { name: "Michael Rodriguez", role: "COO", department: "Operations" },
    { name: "Rachel Kim", role: "CHRO", department: "People & Culture" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book Excerpt Sharing</h1>
            <p className="text-muted-foreground mt-1">Share wisdom and insights with your network</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-accent text-executive-navy">
                <Send className="mr-2 h-4 w-4" />
                Send New Excerpt
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-executive-charcoal border-executive-accent max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-foreground">Send Book Excerpt</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Search for a book or topic and select recipients
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search books, topics, or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-executive-surface border-executive-accent text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gradient-accent text-executive-navy">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Excerpt to Selected Recipients
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Books Shared This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">18</div>
              <p className="text-xs text-muted-foreground mt-1">+6 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Recipients Engaged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">12</div>
              <p className="text-xs text-muted-foreground mt-1">Active readers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">89%</div>
              <p className="text-xs text-muted-foreground mt-1">Average across all excerpts</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Follow-up Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">7</div>
              <p className="text-xs text-muted-foreground mt-1">Meetings scheduled</p>
            </CardContent>
          </Card>
        </div>

        {/* Recently Shared Books */}
        <Card className="bg-gradient-card border-executive-accent">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <BookOpen className="mr-2 h-5 w-5 text-executive-gold" />
              Recently Shared Books
            </CardTitle>
            <CardDescription>Your latest book excerpt sharing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBooks.map((book) => (
                <div key={book.id} className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{book.title}</h3>
                        <Badge className="bg-executive-teal text-white">
                          {book.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
                      <div className="flex items-center space-x-6 mb-3">
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4 text-executive-gold" />
                          <span className="text-sm text-foreground">{book.excerptsSent} excerpts sent</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-executive-teal" />
                          <span className="text-sm text-foreground">{book.engagement} engagement</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {book.keyTopics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4 border-executive-accent">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Reading Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="text-foreground">Team Reading Preferences</CardTitle>
              <CardDescription>Most popular categories and topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Leadership & Strategy</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-executive-gold h-2 w-20 rounded"></div>
                    <span className="text-sm text-executive-gold">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Innovation & Technology</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-executive-teal h-2 w-16 rounded"></div>
                    <span className="text-sm text-executive-teal">72%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Personal Development</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-foreground h-2 w-12 rounded"></div>
                    <span className="text-sm text-foreground">58%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Market Analysis</span>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted-foreground h-2 w-8 rounded"></div>
                    <span className="text-sm text-muted-foreground">43%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Engagement</CardTitle>
              <CardDescription>Team member reading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.slice(0, 4).map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-executive-gold text-executive-navy rounded-full flex items-center justify-center text-sm font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-executive-teal" />
                      <span className="text-sm text-muted-foreground">Read 3 excerpts</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}