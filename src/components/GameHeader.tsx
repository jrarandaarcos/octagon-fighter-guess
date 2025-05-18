
import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle, BarChart2, Share2 } from "lucide-react";
import { useGameContext } from "../context/GameContext";
import StatsDialog from "./StatsDialog";
import HelpDialog from "./HelpDialog";
import ShareDialog from "./ShareDialog";

const GameHeader: React.FC = () => {
  const { gameState } = useGameContext();
  const [showStats, setShowStats] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);

  // Check if this is the first time playing and show help
  React.useEffect(() => {
    const firstTime = localStorage.getItem("ufcdle_first_time");
    if (!firstTime) {
      setShowHelp(true);
      localStorage.setItem("ufcdle_first_time", "false");
    }
  }, []);

  return (
    <header className="flex flex-col items-center justify-center w-full px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 justify-center">
          <div className="octagon bg-ufc-red h-8 w-8 p-1 flex items-center justify-center">
            <span className="text-white font-bold text-xs">UFC</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GuessTheFighter</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-end gap-2">
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => setShowHelp(true)}
            title="How to play"
          >
            <HelpCircle size={20} />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => setShowStats(true)} 
            title="Statistics"
          >
            <BarChart2 size={20} />
          </Button>
          
          {gameState.isGameOver && gameState.dailyFighter && (
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setShowShare(true)}
              title="Share"
            >
              <Share2 size={20} />
            </Button>
          )}
        </div>
      </div>
      
      <StatsDialog open={showStats} onOpenChange={setShowStats} />
      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
      <ShareDialog open={showShare} onOpenChange={setShowShare} />
    </header>
  );
};

export default GameHeader;
