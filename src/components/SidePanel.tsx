import { useState } from "react";
import { Calendar, Lightbulb, FileText, Bell, MessageSquare, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const SidePanel = () => {
  const [showChatBubble, setShowChatBubble] = useState(false);

  const handleInvokeExecMind = () => {
    setShowChatBubble(true);
  };

  const closeChatBubble = () => {
    setShowChatBubble(false);
  };

  return (
    <>
      <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-80 bg-executive-charcoal border-r border-executive-accent p-6">
        <div className="space-y-6">
          {/* Quick Invoke */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-executive-gold uppercase tracking-wider">
              Quick Actions
            </h3>
            <Button 
              onClick={handleInvokeExecMind}
              className="w-full bg-gradient-accent text-executive-navy font-semibold hover:shadow-glow transition-all duration-300"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Invoke ExecMind
            </Button>
          </div>

        {/* Shortcuts */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-executive-gold uppercase tracking-wider">
            Shortcuts
          </h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-executive-accent">
              <Calendar className="mr-3 h-4 w-4" />
              Today's Meetings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-executive-accent">
              <Lightbulb className="mr-3 h-4 w-4" />
              Ideas Inbox
              <Badge className="ml-auto bg-executive-teal text-white">3</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-executive-accent">
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
          <div className="space-y-3">
            <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
              <div className="flex items-start space-x-3">
                <Bell className="h-4 w-4 text-executive-teal mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Follow-up with Sarah on Q4 budget</p>
                  <p className="text-xs text-muted-foreground">Due in 2 hours</p>
                </div>
              </div>
            </div>
            <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
              <div className="flex items-start space-x-3">
                <Bell className="h-4 w-4 text-executive-gold mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Review board presentation</p>
                  <p className="text-xs text-muted-foreground">Due tomorrow</p>
                </div>
              </div>
            </div>
            <div className="bg-executive-surface p-3 rounded-lg border border-executive-accent">
              <div className="flex items-start space-x-3">
                <Bell className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Send book excerpt to team</p>
                  <p className="text-xs text-muted-foreground">Due Friday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </aside>

      {/* Chat Bubble Overlay */}
      {showChatBubble && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-md w-full mx-4 shadow-premium">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-executive-gold" />
                <h3 className="text-lg font-semibold text-foreground">ExecMind</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeChatBubble}
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