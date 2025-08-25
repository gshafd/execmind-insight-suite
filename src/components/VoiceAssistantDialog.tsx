import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, RotateCcw } from "lucide-react";

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

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setIsListening(false);
      setTranscription("");
      setAiResponse("");
      setPhase("listening");
    }
  }, [open]);

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

  const handleReset = () => {
    setIsListening(false);
    setTranscription("");
    setAiResponse("");
    setPhase("listening");
  };

  const WaveformAnimation = () => (
    <div className="flex items-center justify-center space-x-1 h-12">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`bg-assistant-accent rounded-full transition-all duration-300 ${
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
          ? 'bg-assistant-accent w-8 h-8 animate-pulse shadow-assistant-glow' 
          : 'bg-assistant-accent/30 w-4 h-4'
      }`} />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-assistant-bg border border-assistant-accent/20 shadow-assistant-glow">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-assistant-accent font-medium">
            {mode === "post-meeting" ? "Post-Meeting Insight Assistant" : "Pre-Meeting Memory Assistant"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-assistant-accent/60 hover:text-assistant-accent hover:bg-assistant-accent/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 p-3">
          {/* Voice Capture Section */}
          <div className="bg-assistant-bg/80 rounded p-4 border border-assistant-accent/20">
            <div className="text-center space-y-4">
              {phase === "listening" && (
                <>
                  <WaveformAnimation />
                  <p className="text-sm text-assistant-accent">
                    {isListening ? "Listening... speak your question" : "Click to start speaking"}
                  </p>
                </>
              )}
              
              {phase === "processing" && (
                <>
                  <PulsingOrb />
                  <p className="text-sm text-assistant-accent">Processing your question...</p>
                </>
              )}

              {phase === "response" && (
                <div className="text-sm text-assistant-accent">
                  Response ready
                </div>
              )}

              <Button
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
                className={`w-full ${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-assistant-accent hover:bg-assistant-accent/80 text-assistant-bg"
                }`}
              >
                {isListening ? "Stop Listening" : "Start Speaking"}
              </Button>
            </div>
          </div>

          {/* Transcription Display */}
          {transcription && (
            <div className="bg-assistant-bg/60 rounded p-3 border border-assistant-accent/20">
              <h4 className="text-xs font-medium text-assistant-accent/80 mb-2">Live Transcription:</h4>
              <p className="text-sm text-assistant-accent">{transcription}</p>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-assistant-bg/60 rounded p-4 border border-assistant-accent/20">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-assistant-accent">AI Assistant Response</h4>
                <div className="text-sm text-assistant-accent whitespace-pre-line leading-relaxed">
                  {aiResponse}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {phase === "response" && (
            <div className="flex justify-between items-center pt-3 border-t border-assistant-accent/20">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-assistant-accent/40 text-assistant-accent hover:bg-assistant-accent/10">
                  {mode === "post-meeting" ? "Save as Note" : "Save in Memory Bank"}
                </Button>
                <Button variant="outline" size="sm" className="border-assistant-accent/40 text-assistant-accent hover:bg-assistant-accent/10">
                  {mode === "post-meeting" ? "Share with Team" : "Attach to Calendar"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};