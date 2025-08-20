import { useState } from "react";
import { Search, Mic, Camera, Video, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const TopNavigation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setSearchQuery("Schedule follow-up with board members");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <header className="bg-executive-charcoal border-b border-executive-accent shadow-card">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-accent p-2 rounded-lg">
            <div className="text-executive-navy font-bold text-xl">EM</div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-executive-gold">ExecMind</h1>
            <p className="text-xs text-muted-foreground">MarcMind Edition</p>
          </div>
        </div>

        {/* Multimodal Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative bg-executive-surface rounded-lg border border-executive-accent">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Ask ExecMind anything... (text, voice, or image)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-32 py-3 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-executive-gold"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleVoiceInput}
                className={`p-2 ${isRecording ? 'bg-destructive text-destructive-foreground animate-pulse' : 'hover:bg-executive-accent'}`}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-executive-accent"
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-executive-accent"
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-executive-gold">
                <AvatarImage src="/placeholder.svg" alt="Marc" />
                <AvatarFallback className="bg-executive-gold text-executive-navy font-semibold">
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
    </header>
  );
};