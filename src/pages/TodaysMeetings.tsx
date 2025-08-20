import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, FileText, Mic } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  attendees: string[];
  type: string;
  status: "upcoming" | "in-progress" | "completed";
  agenda?: string[];
  notes?: string;
}

const TodaysMeetings = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const meetings: Meeting[] = [
    {
      id: "1",
      title: "Q4 Strategy Review",
      time: "9:00 AM",
      duration: "90 min",
      attendees: ["Sarah Chen (CFO)", "Michael Torres (COO)", "Lisa Wang (Head of Product)"],
      type: "Strategic",
      status: "completed",
      agenda: ["Q4 Performance Analysis", "Resource Allocation 2025", "Market Expansion Strategy"],
      notes: "Approved 15% budget increase for Product division. Need follow-up on European expansion timeline."
    },
    {
      id: "2", 
      title: "Board Preparation Meeting",
      time: "11:30 AM",
      duration: "60 min",
      attendees: ["Jennifer Martinez (General Counsel)", "David Kim (VP Finance)"],
      type: "Governance",
      status: "in-progress",
      agenda: ["Quarterly Board Deck Review", "Legal & Compliance Updates", "Shareholder Communication"],
      notes: "Draft presentation needs executive summary revision. Legal cleared new partnership agreements."
    },
    {
      id: "3",
      title: "Innovation Pipeline Review",
      time: "2:00 PM", 
      duration: "45 min",
      attendees: ["Dr. Amanda Foster (CTO)", "James Wilson (VP R&D)", "Rachel Green (Innovation Lead)"],
      type: "Innovation",
      status: "upcoming",
      agenda: ["AI Initiative Progress", "Patent Applications Q4", "Tech Stack Modernization"],
      notes: ""
    },
    {
      id: "4",
      title: "Leadership Team Sync",
      time: "4:30 PM",
      duration: "30 min", 
      attendees: ["All Direct Reports"],
      type: "Team",
      status: "upcoming",
      agenda: ["Weekly Metrics Review", "Cross-Department Updates", "Priority Alignment"],
      notes: ""
    }
  ];

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate recording for 3 seconds
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400";
      case "in-progress": return "bg-yellow-500/20 text-yellow-400"; 
      case "upcoming": return "bg-blue-500/20 text-blue-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Strategic": return <FileText className="h-4 w-4" />;
      case "Governance": return <Users className="h-4 w-4" />;
      case "Innovation": return <Video className="h-4 w-4" />;
      case "Team": return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-card border-executive-accent rounded-lg p-6 shadow-premium">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Today's Meetings</h1>
              <p className="text-muted-foreground mt-1">September 4, 2025 • {meetings.length} meetings scheduled</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-executive-gold">{meetings.filter(m => m.status === "completed").length}/4</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>

        {/* Meetings Timeline */}
        <div className="grid gap-4">
          {meetings.map((meeting) => (
            <Card 
              key={meeting.id}
              className="bg-gradient-card border-executive-accent hover:shadow-glow transition-all duration-300 cursor-pointer hover-scale"
              onClick={() => handleMeetingClick(meeting)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(meeting.type)}
                    <div>
                      <CardTitle className="text-foreground">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{meeting.time} • {meeting.duration}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {meeting.attendees.length} attendees
                    </span>
                  </div>
                  <span className="text-xs text-executive-gold font-medium">{meeting.type}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meeting Detail Modal */}
        {selectedMeeting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
            <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-2xl w-full mx-4 shadow-premium animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedMeeting.title}</h3>
                  <p className="text-muted-foreground">{selectedMeeting.time} • {selectedMeeting.duration}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedMeeting(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                {/* Attendees */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Attendees</h4>
                  <div className="space-y-1">
                    {selectedMeeting.attendees.map((attendee, index) => (
                      <div key={index} className="text-sm text-muted-foreground">{attendee}</div>
                    ))}
                  </div>
                </div>

                {/* Agenda */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Agenda</h4>
                  <ul className="space-y-1">
                    {selectedMeeting.agenda?.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                {selectedMeeting.notes && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{selectedMeeting.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={handleRecording}
                    className={`bg-gradient-accent text-executive-navy ${isRecording ? 'animate-pulse' : ''}`}
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    {isRecording ? 'Recording...' : 'Record Meeting'}
                  </Button>
                  <Button variant="outline" className="border-executive-accent text-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    View Agenda
                  </Button>
                  <Button variant="outline" className="border-executive-accent text-foreground">
                    <Video className="mr-2 h-4 w-4" />
                    Join Video
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

export default TodaysMeetings;