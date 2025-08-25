import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Mic, MicOff, Save, Share2, Calendar, Brain } from "lucide-react";
import { Badge } from "./ui/badge";

interface VoiceAssistantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "post-meeting" | "pre-meeting";
  meetingTitle?: string;
}

export const VoiceAssistantDialog: React.FC<VoiceAssistantDialogProps> = ({
  open,
  onOpenChange,
  mode,
  meetingTitle = "Board Strategy Session"
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [phase, setPhase] = useState<"listening" | "processing" | "response">("listening");

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setPhase("listening");
      setTranscription("");
      setAiResponse("");
      simulateTranscription();
    } else {
      setIsListening(false);
      setPhase("processing");
      setTimeout(() => {
        setPhase("response");
        generateAIResponse();
      }, 1500);
    }
  };

  const simulateTranscription = () => {
    const sampleQuestions = {
      "post-meeting": "What were the key decisions made in the board meeting today?",
      "pre-meeting": "What should I know before my meeting with the Fortune 100 retailer?"
    };
    
    const text = sampleQuestions[mode];
    let currentText = "";
    
    const words = text.split(" ");
    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += (index > 0 ? " " : "") + word;
        setTranscription(currentText);
      }, index * 300 + 500);
    });
  };

  const generateAIResponse = () => {
    const responses = {
      "post-meeting": {
        content: `Here's what happened in your ${meetingTitle}:

🎯 **Key Decisions Made:**
• APAC expansion approved with $15M Q2 budget allocation
• Culture transformation taskforce authorized  
• AI innovation budget confirmed at $15M for FY25

⚡ **Action Items Assigned:**
• Sarah: Finalize APAC market entry strategy (Due: Dec 5)
• David: Launch culture transformation initiative (Due: Dec 15)
• Lisa: Complete AI adoption roadmap (Due: Nov 30)

📊 **Strategic Outcomes:**
• Revenue growth target of 22% confirmed for FY25
• Investor sentiment positive around AI initiatives
• New 90-day performance dashboard rollout approved`,
        insights: ["3 strategic decisions", "78% action completion rate", "Above average meeting efficiency"]
      },
      "pre-meeting": {
        content: `Here's what you should know before your Fortune 100 Retailer meeting:

🧩 **Key Talking Points:**
• Strengthen AI-powered supply chain visibility
• Offer exclusive pilot program access
• Highlight sustainability initiatives

⚡ **Potential Risks:**
• Client concerns about data privacy with AI integration
• Budget constraints due to recent economic headwinds
• Competition from established vendors

📊 **Key Data Points:**
• Client's current supply chain efficiency: 87%
• Potential ROI improvement: 23-35%
• Implementation timeline: 6-8 months

🌎 **Strategic Context:**
• Client expanding into LATAM markets next year
• Strong focus on ESG compliance requirements
• Recent leadership change in procurement division`,
        insights: ["High-priority client", "Previous engagement: $2.3M", "Decision timeline: 30 days"]
      }
    };

    setAiResponse(responses[mode].content);
  };

  const WaveformAnimation = () => (
    <div className="flex items-center justify-center space-x-1 h-12">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`bg-executive-purple rounded-full transition-all duration-300 ${
            isListening 
              ? 'animate-pulse h-8 w-1' 
              : 'h-2 w-1'
          }`}
          style={{
            animationDelay: `${i * 0.1}s`,
            height: isListening ? `${Math.random() * 32 + 8}px` : '8px'
          }}
        />
      ))}
    </div>
  );

  const PulsingOrb = () => (
    <div className="flex items-center justify-center h-12">
      <div className={`rounded-full transition-all duration-1000 ${
        phase === "processing" 
          ? 'bg-executive-purple w-8 h-8 animate-pulse shadow-purple-glow' 
          : 'bg-executive-purple/30 w-4 h-4'
      }`} />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background/80 backdrop-blur-xl border border-executive-purple/20 shadow-purple-glow">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-foreground">
            {mode === "post-meeting" ? (
              <>
                <Mic className="h-5 w-5 text-executive-purple" />
                <span>Post-Meeting Insight Assistant</span>
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 text-executive-purple" />
                <span>Pre-Meeting Memory Assistant</span>
                <Badge className="bg-executive-purple/20 text-executive-purple border-executive-purple/30">
                  Prep Mode
                </Badge>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Voice Capture Section */}
          <div className="bg-executive-surface/50 rounded-lg p-6 border border-executive-purple/10">
            <div className="text-center space-y-4">
              {phase === "listening" && (
                <>
                  <WaveformAnimation />
                  <p className="text-sm text-muted-foreground">
                    {isListening ? "Listening... speak your question" : "Click to start speaking"}
                  </p>
                </>
              )}
              
              {phase === "processing" && (
                <>
                  <PulsingOrb />
                  <p className="text-sm text-executive-purple">Processing your question...</p>
                </>
              )}

              {phase === "response" && (
                <div className="text-sm text-executive-gold">
                  ✨ Response ready
                </div>
              )}

              <Button
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
                className={`rounded-full w-16 h-16 ${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-executive-purple hover:bg-executive-purple/80 shadow-purple-glow"
                }`}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Transcription Display */}
          {transcription && (
            <div className="bg-executive-navy/50 rounded-lg p-4 border border-executive-teal/20">
              <h4 className="text-sm font-medium text-executive-teal mb-2">Live Transcription:</h4>
              <p className="text-sm text-foreground">{transcription}</p>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-executive-surface/80 rounded-lg p-6 border border-executive-gold/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-executive-gold rounded-full animate-pulse" />
                  <h4 className="text-sm font-medium text-executive-gold">AI Assistant Response</h4>
                </div>
                <div className="prose prose-sm text-foreground whitespace-pre-line">
                  {aiResponse}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {phase === "response" && (
            <div className="flex justify-between items-center pt-4 border-t border-executive-accent">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-executive-teal text-executive-teal hover:bg-executive-teal/10">
                  <Save className="h-4 w-4 mr-2" />
                  {mode === "post-meeting" ? "Save as Note" : "Save in CEO Memory Bank"}
                </Button>
                <Button variant="outline" size="sm" className="border-executive-gold text-executive-gold hover:bg-executive-gold/10">
                  {mode === "post-meeting" ? (
                    <>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Team
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Attach to Calendar
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};