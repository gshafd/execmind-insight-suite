import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, RotateCcw, Check, Share, Calendar, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";

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
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [modalStep, setModalStep] = useState<"initial" | "confirmation">("initial");
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  const teams = ["HR Team", "Strategy Team", "Marketing Team", "Product Team"];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';
      
      speechRecognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscription(finalTranscript + interimTranscript);
      };
      
      speechRecognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setPhase("listening");
      };
      
      speechRecognition.onend = () => {
        if (isListening) {
          speechRecognition.start(); // Restart if we're still supposed to be listening
        }
      };
      
      setRecognition(speechRecognition);
    }
  }, [isListening]);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setIsListening(false);
      setTranscription("");
      setAiResponse("");
      setPhase("listening");
      setActiveModal(null);
      setSelectedTeams([]);
      setModalStep("initial");
      
      // Stop recognition if it's running
      if (recognition) {
        recognition.stop();
      }
    }
  }, [open, recognition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  // Auto-dismiss modals after 3 seconds
  useEffect(() => {
    if (activeModal && activeModal !== "share-team") {
      const timer = setTimeout(() => {
        setActiveModal(null);
        setModalStep("initial");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeModal]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (!isListening) {
      setIsListening(true);
      setPhase("listening");
      setTranscription("");
      setAiResponse("");
      
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsListening(false);
        setPhase("listening");
      }
    } else {
      setIsListening(false);
      recognition.stop();
      
      if (transcription.trim()) {
        setPhase("processing");
        setTimeout(() => {
          setPhase("response");
          generateAIResponse();
        }, 1500);
      } else {
        setPhase("listening");
      }
    }
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
    setActiveModal("save-note");
  };

  const handleShareWithTeam = () => {
    setActiveModal("share-team");
    setModalStep("initial");
    setSelectedTeams([]);
  };

  const handleAddToCalendar = () => {
    setActiveModal("add-calendar");
  };

  const handleSaveInMemory = () => {
    setActiveModal("save-memory");
  };

  const handleTeamToggle = (team: string) => {
    setSelectedTeams(prev => 
      prev.includes(team) 
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
  };

  const handleSendToTeams = () => {
    setModalStep("confirmation");
    setTimeout(() => {
      setActiveModal(null);
      setModalStep("initial");
    }, 3000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalStep("initial");
    setSelectedTeams([]);
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
      
      {/* Action Modals */}
      {activeModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center animate-fade-in"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999
          }}
          onClick={closeModal}
        >
          <div 
            className="bg-dark border rounded-lg p-6 text-center max-w-md w-full mx-4"
            style={{ 
              backgroundColor: '#181818', 
              borderColor: '#6c14dc33',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Save as Note Modal */}
            {activeModal === "save-note" && (
              <>
                <div className="text-lg font-semibold mb-4" style={{ color: '#6c14dc' }}>Save as Note</div>
                <div className="text-4xl mb-4">✅</div>
                <p className="text-sm mb-6" style={{ color: '#00E0FF' }}>
                  Your note has been saved successfully.
                </p>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border transition-all duration-200 active:scale-95"
                  style={{
                    borderColor: '#6c14dc',
                    color: '#6c14dc',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6c14dc11'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Close
                </button>
              </>
            )}

            {/* Share with Team Modal */}
            {activeModal === "share-team" && (
              <>
                {modalStep === "initial" ? (
                  <>
                    <div className="text-lg font-semibold mb-4" style={{ color: '#6c14dc' }}>Share with Team</div>
                    <div className="text-4xl mb-4" style={{ color: '#6c14dc' }}>📤</div>
                    <div className="text-left mb-6">
                      <p className="text-sm mb-3" style={{ color: '#00E0FF' }}>Select teams to share with:</p>
                      <div className="space-y-2 bg-black/20 p-3 rounded border" style={{ borderColor: '#6c14dc33' }}>
                        {teams.map((team) => (
                          <div key={team} className="flex items-center space-x-2">
                            <Checkbox
                              id={team}
                              checked={selectedTeams.includes(team)}
                              onCheckedChange={() => handleTeamToggle(team)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label htmlFor={team} className="text-sm cursor-pointer" style={{ color: '#00E0FF' }}>
                              {team}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 rounded-md border transition-all duration-200 active:scale-95"
                        style={{
                          borderColor: '#666',
                          color: '#999',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendToTeams}
                        disabled={selectedTeams.length === 0}
                        className="px-4 py-2 rounded-md border transition-all duration-200 active:scale-95 disabled:opacity-50"
                        style={{
                          borderColor: '#6c14dc',
                          color: '#6c14dc',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#6c14dc11')}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-4">✅</div>
                    <p className="text-sm" style={{ color: '#00E0FF' }}>
                      Shared successfully with {selectedTeams.join(', ')}.
                    </p>
                  </>
                )}
              </>
            )}

            {/* Add to Calendar Modal */}
            {activeModal === "add-calendar" && (
              <>
                <div className="text-lg font-semibold mb-4" style={{ color: '#6c14dc' }}>Add to Calendar</div>
                <div className="text-4xl mb-4" style={{ color: '#6c14dc' }}>📅</div>
                <p className="text-sm mb-4" style={{ color: '#00E0FF' }}>
                  Meeting added to your calendar.
                </p>
                <div className="text-2xl mb-6">✅</div>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border transition-all duration-200 active:scale-95"
                  style={{
                    borderColor: '#6c14dc',
                    color: '#6c14dc',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6c14dc11'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Close
                </button>
              </>
            )}

            {/* Save in Memory Modal */}
            {activeModal === "save-memory" && (
              <>
                <div className="text-lg font-semibold mb-4" style={{ color: '#6c14dc' }}>Save in Memory</div>
                <div className="text-4xl mb-4">💾</div>
                <p className="text-sm mb-4" style={{ color: '#00E0FF' }}>
                  Insight has been saved to your memory.
                </p>
                <div className="text-2xl mb-6">✅</div>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border transition-all duration-200 active:scale-95"
                  style={{
                    borderColor: '#6c14dc',
                    color: '#6c14dc',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6c14dc11'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
};