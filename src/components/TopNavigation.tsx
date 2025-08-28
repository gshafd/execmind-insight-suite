import { useState } from "react";
import { Search, Mic, Camera, Video, User, Send, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
export const TopNavigation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showListening, setShowListening] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    setShowListening(!showListening);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setSearchQuery("Schedule follow-up with board members");
        setIsRecording(false);
        setShowListening(false);
      }, 2000);
    }
  };
  const handleSubmit = () => {
    if (searchQuery.trim()) {
      // Simulate search action
      console.log("Searching for:", searchQuery);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleImageUpload = () => {
    setShowImageUpload(true);
  };
  const handleVideoRecord = () => {
    setShowVideoModal(true);
  };
  return <header className="bg-executive-charcoal border-b border-executive-accent shadow-card">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-accent p-2 rounded-lg">
            <div className="text-executive-navy font-bold text-xl">EM</div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-executive-gold">ExecMind</h1>
            <p className="text-xs text-muted-foreground">Marc Edition</p>
          </div>
        </div>

        {/* Multimodal Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative bg-executive-surface rounded-lg border border-executive-accent">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Ask ExecMind anything... (text, voice, or image)" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} className="pl-10 pr-40 py-3 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-executive-gold" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button size="sm" variant="ghost" onClick={handleSubmit} className="p-2 hover:bg-executive-accent">
                <Send className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleVoiceInput} className={`p-2 ${isRecording ? 'bg-destructive text-destructive-foreground animate-pulse' : 'hover:bg-executive-accent'}`}>
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleImageUpload} className="p-2 hover:bg-executive-accent">
                <Camera className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleVideoRecord} className="p-2 hover:bg-executive-accent">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-primary bg-white">
                <AvatarFallback className="bg-white text-primary font-bold">
                  M
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-executive-charcoal border-executive-accent" align="end">
            <DropdownMenuLabel className="text-foreground">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Marc</p>
                <p className="text-xs leading-none text-muted-foreground">
                  CEO, Crum & Foster
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-executive-accent" />
            <DropdownMenuItem className="text-foreground hover:bg-executive-accent">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-executive-accent">
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-executive-accent">
              Analytics
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-executive-accent" />
            <DropdownMenuItem className="text-foreground hover:bg-executive-accent">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Listening Overlay */}
      {showListening && <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-4 shadow-premium">
            <div className="flex items-center space-x-3">
              <Mic className="h-5 w-5 text-destructive animate-pulse" />
              <span className="text-foreground">Listening...</span>
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-executive-gold animate-pulse"></div>
                <div className="w-1 h-6 bg-executive-gold animate-pulse" style={{
              animationDelay: '0.1s'
            }}></div>
                <div className="w-1 h-3 bg-executive-gold animate-pulse" style={{
              animationDelay: '0.2s'
            }}></div>
                <div className="w-1 h-5 bg-executive-gold animate-pulse" style={{
              animationDelay: '0.3s'
            }}></div>
              </div>
            </div>
          </div>
        </div>}

      {/* Image Upload Modal */}
      {showImageUpload && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-md w-full mx-4 shadow-premium">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Upload Image</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowImageUpload(false)} className="text-muted-foreground hover:text-foreground">
                ×
              </Button>
            </div>
            <div className="border-2 border-dashed border-executive-accent rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground mb-2">Choose an image to upload</p>
              <p className="text-sm text-muted-foreground mb-4">PNG, JPG, GIF up to 10MB</p>
              <Button className="bg-gradient-accent text-executive-navy">
                Select File
              </Button>
            </div>
          </div>
        </div>}

      {/* Video Recording Modal */}
      {showVideoModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-executive-charcoal border border-executive-accent rounded-lg p-6 max-w-md w-full mx-4 shadow-premium">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Video Recording</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowVideoModal(false)} className="text-muted-foreground hover:text-foreground">
                ×
              </Button>
            </div>
            <div className="text-center">
              <Video className="h-16 w-16 text-executive-gold mx-auto mb-4" />
              <p className="text-foreground mb-4">Ready to record your message</p>
              <div className="flex space-x-3 justify-center">
                <Button className="bg-destructive text-destructive-foreground">
                  Start Recording
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </header>;
};