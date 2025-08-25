import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, RotateCcw, Check, Share, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: "", text: "" });
  const { toast } = useToast();

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

  const handleSaveAsNote = () => {
    setModalContent({ icon: "✅", text: "Note Saved Successfully" });
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleShareWithTeam = () => {
    toast({
      title: "📤 Shared with Team",
      duration: 2000,
    });
  };

  const handleAddToCalendar = () => {
    setModalContent({ icon: "📅", text: "Added to your calendar" });
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleSaveInMemory = () => {
    toast({
      title: "✅ Saved in Memory",
      duration: 2000,
    });
  };

  const WaveformAnimation = () => (
    <div className="flex items-center justify-center space-x-1 h-12">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            isListening 
              ? 'animate-pulse h-8 w-1' 
              : 'h-2 w-1'
          }`}
          style={{
            backgroundColor: '#00E0FF',
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
          ? 'w-8 h-8 animate-pulse' 
          : 'w-4 h-4'
      }`} style={{
        backgroundColor: phase === "processing" ? '#00E0FF' : '#00E0FF4d'
      }} />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" style={{ backgroundColor: '#181818', borderColor: '#00E0FF33' }}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="font-medium" style={{ color: '#00E0FF' }}>
            {mode === "post-meeting" ? "Post-Meeting Insight Assistant" : "Pre-Meeting Memory Assistant"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="hover:bg-transparent"
            style={{ color: '#00E0FF66' }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 p-3">
          {/* Voice Capture Section */}
          <div className="rounded p-4 border" style={{ backgroundColor: '#121212', borderColor: '#00E0FF33' }}>
            <div className="text-center space-y-4">
              {phase === "listening" && (
                <>
                  <WaveformAnimation />
                  <p className="text-sm" style={{ color: '#00E0FF' }}>
                    {isListening ? "Listening... speak your question" : "Click to start speaking"}
                  </p>
                </>
              )}
              
              {phase === "processing" && (
                <>
                  <PulsingOrb />
                  <p className="text-sm" style={{ color: '#00E0FF' }}>Processing your question...</p>
                </>
              )}

              {phase === "response" && (
                <div className="text-sm" style={{ color: '#00E0FF' }}>
                  Response ready
                </div>
              )}

              <Button
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
                className="w-full"
                style={{
                  backgroundColor: isListening ? '#dc2626' : '#00E0FF',
                  color: isListening ? '#ffffff' : '#181818',
                  border: 'none'
                }}
              >
                {isListening ? "Stop Listening" : "Start Speaking"}
              </Button>
            </div>
          </div>

          {/* Transcription Display */}
          {transcription && (
            <div className="rounded p-3 border" style={{ backgroundColor: '#121212', borderColor: '#00E0FF33' }}>
              <h4 className="text-xs font-medium mb-2" style={{ color: '#00E0FFcc' }}>Live Transcription:</h4>
              <p className="text-sm" style={{ color: '#00E0FF' }}>{transcription}</p>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="rounded p-4 border" style={{ backgroundColor: '#121212', borderColor: '#00E0FF33' }}>
              <div className="space-y-3">
                <h4 className="text-sm font-medium" style={{ color: '#00E0FF' }}>AI Assistant Response</h4>
                <div className="text-sm whitespace-pre-line leading-relaxed" style={{ color: '#00E0FF' }}>
                  {aiResponse}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {phase === "response" && (
            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#00E0FF33' }}>
              <div className="flex space-x-2">
                <button
                  onClick={mode === "post-meeting" ? handleSaveAsNote : handleSaveInMemory}
                  className="px-3 py-2 text-sm font-medium rounded-md border transition-all duration-200 hover:shadow-md active:scale-95"
                  style={{
                    borderColor: '#00E0FF66',
                    color: '#00E0FF',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00E0FF11';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {mode === "post-meeting" ? "Save as Note" : "Save in Memory"}
                </button>
                <button
                  onClick={mode === "post-meeting" ? handleShareWithTeam : handleAddToCalendar}
                  className="px-3 py-2 text-sm font-medium rounded-md border transition-all duration-200 hover:shadow-md active:scale-95"
                  style={{
                    borderColor: '#00E0FF66',
                    color: '#00E0FF',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00E0FF11';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {mode === "post-meeting" ? "Share with Team" : "Add to Calendar"}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      
      {/* Success Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <div 
            className="bg-dark border rounded-lg p-6 text-center animate-fade-in"
            style={{ 
              backgroundColor: '#181818', 
              borderColor: '#00E0FF33',
              maxWidth: '320px',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div className="text-3xl mb-3">{modalContent.icon}</div>
            <p className="text-sm font-medium" style={{ color: '#00E0FF' }}>
              {modalContent.text}
            </p>
          </div>
        </div>
      )}
    </Dialog>
  );
};