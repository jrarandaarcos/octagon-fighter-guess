
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGameContext } from '../context/GameContext';

interface StatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StatsDialog: React.FC<StatsDialogProps> = ({ open, onOpenChange }) => {
  const { gameStats } = useGameContext();
  const { gamesPlayed, gamesWon, currentStreak, maxStreak, guessDistribution } = gameStats;
  
  // Calculate win percentage
  const winPercentage = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
  
  // Find the max value in guess distribution for scaling the bars
  const maxDistribution = Math.max(...Object.values(guessDistribution));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Statistics</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Stats boxes */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{gamesPlayed}</span>
              <span className="text-xs">Played</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{winPercentage}%</span>
              <span className="text-xs">Win %</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{currentStreak}</span>
              <span className="text-xs">Current<br/>Streak</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{maxStreak}</span>
              <span className="text-xs">Max<br/>Streak</span>
            </div>
          </div>
          
          {/* Guess distribution */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium mb-2">Guess Distribution</h3>
            
            {gamesPlayed === 0 ? (
              <p className="text-sm text-muted-foreground">No games played yet</p>
            ) : (
              <div className="space-y-1">
                {Object.entries(guessDistribution).map(([guess, count]) => {
                  const percentage = maxDistribution > 0 ? (count / maxDistribution) * 100 : 0;
                  return (
                    <div key={guess} className="flex items-center gap-2">
                      <div className="w-4 text-sm">{guess}</div>
                      <div 
                        className="h-6 bg-ufc-red rounded text-white px-2 flex items-center justify-end text-xs"
                        style={{ width: `${Math.max(percentage, 8)}%` }}
                      >
                        {count > 0 && count}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatsDialog;
