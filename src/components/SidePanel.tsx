import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Lightbulb, FileText, Bell, MessageSquare, X, Mic, Camera, Upload, Send, Archive, UserPlus, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface PendingAction {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export const SidePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [showExecMindModal, setShowExecMindModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState<PendingAction | null>(null);
  const [aiInput, setAiInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([
    {
      id: "1",
      title: "Follow-up with Sarah on Q4 budget",
      description: "Review the proposed Q4 budget allocation and discuss the 15% increase request for the Product division. Key areas: hiring plan, technology infrastructure, and market expansion costs.",
      dueDate: "Due in 2 hours",
      priority: "high",
      completed: false
    },
    {
      id: "2", 
      title: "Review board presentation",
      description: "Final review of the quarterly board presentation deck. Focus on financial performance slides, strategic initiatives update, and competitive landscape analysis.",
      dueDate: "Due tomorrow",
      priority: "medium",
      completed: false
    },
    {
      id: "3",
      title: "Send book excerpt to team",
      description: "Share selected chapters from 'The Innovator's Dilemma' with the leadership team ahead of next week's strategy session. Include discussion questions.",
      dueDate: "Due Friday", 
      priority: "low",
      completed: false
    }
  ]);

  const handleInvokeExecMind = () => {
    setShowExecMindModal(true);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setAiInput("Schedule a strategy meeting with the innovation team for next week");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleActionClick = (action: PendingAction) => {
    setShowActionModal(action);
  };

  const toggleActionComplete = (actionId: string) => {
    setPendingActions(prevActions =>
      prevActions.map(action =>
        action.id === actionId ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const navigateToShortcut = (path: string) => {
    navigate(path);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const isHomePage = location.pathname === "/" || location.pathname === "";

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-80 bg-executive-charcoal border-r border-executive-accent p-6">
        <div className="space-y-6">
          {/* Home Button */}
          <div className="mb-4">
            <Button 
              onClick={handleGoHome}
              variant="ghost"
              className={`w-full justify-start text-foreground hover:bg-executive-accent hover-scale transition-all duration-300 animate-fade-in ${
                isHomePage 
                  ? 'bg-executive-purple/20 text-executive-purple border border-executive-purple/30 shadow-purple-glow' 
                  : 'hover:shadow-glow'
              }`}
            >
              <Home className="mr-3 h-4 w-4" />
              <span className="text-sm font-medium">Home</span>
            </Button>
          </div>

          {/* Quick Invoke */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-executive-gold uppercase tracking-wider">
              Quick Actions
            </h3>
            <Button 
              onClick={handleInvokeExecMind}
              className="w-full bg-gradient-accent text-executive-navy font-semibold hover:shadow-glow transition-all duration-300 hover-scale"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Quick Capture
            </Button>
          </div>

          {/* Shortcuts */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-executive-gold uppercase tracking-wider">
              Shortcuts
            </h3>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                onClick={() => navigateToShortcut('/todays-meetings')}
                className="w-full justify-start text-foreground hover:bg-executive-accent hover-scale transition-all duration-200"
              >
                <Calendar className="mr-3 h-4 w-4" />
                Today's Meetings
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigateToShortcut('/ideas-inbox')}
                className="w-full justify-start text-foreground hover:bg-executive-accent hover-scale transition-all duration-200"
              >
                <Lightbulb className="mr-3 h-4 w-4" />
                Ideas Inbox
                <Badge className="ml-auto bg-executive-teal text-white animate-pulse">3</Badge>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigateToShortcut('/weekly-wrap-up')}
                className="w-full justify-start text-foreground hover:bg-executive-accent hover-scale transition-all duration-200"
              >
                <FileText className="mr-3 h-4 w-4" />
                Weekly Wrap-up
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-executive-gold uppercase tracking-wider">
              Pending Actions
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pendingActions.filter(action => !action.completed).map((action) => (
                <div key={action.id} className="bg-executive-surface p-3 rounded-lg border border-executive-accent hover:shadow-glow transition-all duration-300 hover-scale">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={action.completed}
                      onChange={() => toggleActionComplete(action.id)}
                      className="mt-1 accent-executive-gold"
                    />
                    <div className="flex-1">
                      <p 
                        className={`text-sm text-foreground cursor-pointer hover:text-executive-gold transition-colors ${action.completed ? 'line-through opacity-50' : ''}`}
                        onClick={() => handleActionClick(action)}
                      >
                        {action.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{action.dueDate}</p>
                        <Bell className={`h-3 w-3 ${getPriorityColor(action.priority)}`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Completed Actions */}
              {pendingActions.some(action => action.completed) && (
                <div className="border-t border-executive-accent pt-3">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Completed</h4>
                  {pendingActions.filter(action => action.completed).map((action) => (
                    <div key={action.id} className="bg-executive-surface/50 p-2 rounded border border-executive-accent/50 mb-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={action.completed}
                          onChange={() => toggleActionComplete(action.id)}
                          className="accent-executive-gold"
                        />
                        <p className="text-xs text-muted-foreground line-through">{action.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ExecMind AI Modal */}
      {showExecMindModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-2xl w-full mx-4 shadow-premium animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-executive-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">ExecMind AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">Your intelligent executive companion</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowExecMindModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Input Options */}
              <div className="flex space-x-2 mb-4">
                <Button 
                  onClick={handleVoiceInput}
                  variant="outline"
                  className={`border-executive-accent ${isRecording ? 'bg-destructive text-destructive-foreground animate-pulse' : ''}`}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  {isRecording ? 'Recording...' : 'Start Recording'}
                </Button>
                <Button variant="outline" className="border-executive-accent">
                  <Camera className="mr-2 h-4 w-4" />
                  Image Analysis
                </Button>
                <Button variant="outline" className="border-executive-accent">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </div>

              {/* Text Input */}
              <div className="space-y-3">
                <Textarea 
                  placeholder="Hey Marc, let me know what's on your mind today..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="bg-executive-surface border-executive-accent text-foreground resize-none"
                  rows={3}
                />
                
                {/* AI Suggestions */}
                <div className="bg-executive-surface p-4 rounded-lg border border-executive-accent">
                  <h4 className="text-sm font-semibold text-executive-gold mb-2">AI Suggestions</h4>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">• Review today's decision items and dependencies</p>
                    <p className="text-xs text-muted-foreground">• Analyze team performance metrics for strategic insights</p>
                    <p className="text-xs text-muted-foreground">• Prepare talking points for upcoming board meeting</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button className="bg-gradient-accent text-executive-navy flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Process Request
                </Button>
                <Button variant="outline" className="border-executive-accent text-foreground">
                  <FileText className="mr-2 h-4 w-4" />
                  Save Insights
                </Button>
                <Button variant="outline" className="border-executive-accent text-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Detail Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-md w-full mx-4 shadow-premium animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Action Details</h3>
              <Button
                variant="ghost"
                onClick={() => setShowActionModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-1">{showActionModal.title}</h4>
                <p className="text-sm text-muted-foreground">{showActionModal.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{showActionModal.dueDate}</span>
                <Badge className={`${getPriorityColor(showActionModal.priority)} bg-executive-surface`}>
                  {showActionModal.priority} priority
                </Badge>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button size="sm" variant="outline" className="border-executive-accent text-foreground">
                  <Calendar className="mr-2 h-3 w-3" />
                  Reschedule
                </Button>
                <Button size="sm" variant="outline" className="border-executive-accent text-foreground">
                  <UserPlus className="mr-2 h-3 w-3" />
                  Assign
                </Button>
                <Button size="sm" variant="outline" className="border-executive-accent text-foreground">
                  <FileText className="mr-2 h-3 w-3" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple Chat Bubble (kept for backwards compatibility) */}
      {showChatBubble && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-md w-full mx-4 shadow-premium animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-executive-gold" />
                <h3 className="text-lg font-semibold text-foreground">ExecMind</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatBubble(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-foreground">Hey Marc, let me know what's on your mind today…</p>
          </div>
        </div>
      )}
    </>
  );
};