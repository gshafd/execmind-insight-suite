import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardTiles } from "@/components/DashboardTiles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Clock, Star, Plus } from "lucide-react";
import { format } from "date-fns";

const Index = () => {
  const [capabilityName, setCapabilityName] = useState("");
  const [capabilityDescription, setCapabilityDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const handleAddCapability = () => {
    // Handle adding the capability
    console.log({
      name: capabilityName,
      description: capabilityDescription,
      agent: selectedAgent
    });
    // Reset form
    setCapabilityName("");
    setCapabilityDescription("");
    setSelectedAgent("");
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-card border-executive-accent rounded-lg p-6 shadow-premium">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Good afternoon, Marc</h1>
              <p className="text-muted-foreground mt-1">Your CEO command center for strategic leadership and operational excellence</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Week of</div>
              <div className="text-lg font-semibold text-executive-gold">{format(new Date(), 'MMMM d, yyyy')}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Revenue Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">+18%</div>
              <p className="text-xs text-muted-foreground">QoQ</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Leadership Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-teal">12</div>
              <p className="text-xs text-muted-foreground">Direct Reports</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground">Strategic Meetings</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-executive-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Star className="mr-2 h-4 w-4" />
                Employee NPS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-executive-gold">68</div>
              <p className="text-xs text-muted-foreground">+5 vs Q3</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tiles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">CEO Command Center</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-executive-accent text-foreground hover:bg-executive-accent hover-scale transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Capability
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-executive-charcoal border-executive-accent">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Add New Capability</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Create a new strategic capability for your CEO command center.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Name of the Capability</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Strategic Planning Assistant"
                      value={capabilityName}
                      onChange={(e) => setCapabilityName(e.target.value)}
                      className="bg-executive-surface border-executive-accent text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground">Description of the Capability</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this capability will do and how it will help..."
                      value={capabilityDescription}
                      onChange={(e) => setCapabilityDescription(e.target.value)}
                      className="bg-executive-surface border-executive-accent text-foreground resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent" className="text-foreground">Connect an AI Agent</Label>
                    <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                      <SelectTrigger className="bg-executive-surface border-executive-accent text-foreground">
                        <SelectValue placeholder="Select an AI agent" />
                      </SelectTrigger>
                      <SelectContent className="bg-executive-charcoal border-executive-accent">
                        <SelectItem value="fd-ryze-2" className="text-foreground">FD Ryze 2.0</SelectItem>
                        <SelectItem value="fd-ryze-infinity" className="text-foreground">FD Ryze Infinity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-executive-accent text-foreground">
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <Button 
                    onClick={handleAddCapability}
                    className="bg-gradient-accent text-executive-navy hover:shadow-glow transition-all duration-300"
                  >
                    Add Capability
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DashboardTiles />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
