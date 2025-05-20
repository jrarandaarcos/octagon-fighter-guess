
import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameStats } from '@/types/game';
import { Share2 } from 'lucide-react';
import FinalShareDialog from './FinalShareDialog';

interface CombinedStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CombinedStatsDialog: React.FC<CombinedStatsDialogProps> = ({ open, onOpenChange }) => {
  const { getAllGameStats, gameCompletionStatus } = useGameContext();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const allStats = getAllGameStats();
  
  // Calculate wins across all game types
  const totalGamesPlayed = allStats.male.gamesPlayed + allStats.female.gamesPlayed;
  const totalWins = allStats.male.gamesWon + allStats.female.gamesWon;
  const winPercentage = totalGamesPlayed > 0 ? Math.round((totalWins / totalGamesPlayed) * 100) : 0;
  
  // Calculate max streak across all game types
  const maxStreak = Math.max(allStats.male.maxStreak, allStats.female.maxStreak);
  
  // Calculate current streaks
  const currentStreakMale = allStats.male.currentStreak;
  const currentStreakFemale = allStats.female.currentStreak;
  const combinedStreak = (currentStreakMale > 0 && currentStreakFemale > 0) 
    ? currentStreakMale + currentStreakFemale 
    : Math.max(currentStreakMale, currentStreakFemale);
  
  // Check if all games are completed for today
  const allGamesCompleted = gameCompletionStatus.male && 
                            gameCompletionStatus.female && 
                            gameCompletionStatus.nickname;
  
  const renderStatsForType = (stats: GameStats, type: string) => {
    // Find the max value in guess distribution for scaling the bars
    const maxDistribution = Math.max(...Object.values(stats.guessDistribution));
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{stats.gamesPlayed}</span>
            <span className="text-xs">Played</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">
              {stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%
            </span>
            <span className="text-xs">Win %</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{stats.currentStreak}</span>
            <span className="text-xs">Current<br/>Streak</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{stats.maxStreak}</span>
            <span className="text-xs">Max<br/>Streak</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium mb-2">Guess Distribution</h3>
          
          {stats.gamesPlayed === 0 ? (
            <p className="text-sm text-muted-foreground">No games played yet</p>
          ) : (
            <div className="space-y-1">
              {Object.entries(stats.guessDistribution).map(([guess, count]) => {
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
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Combined Game Statistics</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Combined stats summary */}
            <div className="grid grid-cols-4 gap-2 text-center border-b pb-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{totalGamesPlayed}</span>
                <span className="text-xs">Total<br/>Played</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{winPercentage}%</span>
                <span className="text-xs">Overall<br/>Win %</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{combinedStreak}</span>
                <span className="text-xs">Current<br/>Streak</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{maxStreak}</span>
                <span className="text-xs">Max<br/>Streak</span>
              </div>
            </div>
            
            {/* Tab for each game type */}
            <Tabs defaultValue="male">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="male">Male</TabsTrigger>
                <TabsTrigger value="female">Female</TabsTrigger>
                <TabsTrigger value="nickname">Nickname</TabsTrigger>
              </TabsList>
              
              <TabsContent value="male" className="pt-4">
                {renderStatsForType(allStats.male, 'Male')}
              </TabsContent>
              
              <TabsContent value="female" className="pt-4">
                {renderStatsForType(allStats.female, 'Female')}
              </TabsContent>
              
              <TabsContent value="nickname" className="pt-4">
                <div className="space-y-2 text-center">
                  <h3 className="font-medium">Nickname Game Stats</h3>
                  {gameCompletionStatus.nickname ? (
                    <div>
                      <p className="text-2xl font-bold">{allStats.nickname.gamesWon}/7</p>
                      <p className="text-xs">Today's Score</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Complete today's nickname game to see stats</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Share button */}
            {allGamesCompleted && (
              <div className="flex justify-center pt-2">
                <Button 
                  onClick={() => setShareDialogOpen(true)}
                  className="bg-ufc-red hover:bg-red-600 text-white"
                >
                  <Share2 size={16} className="mr-2" /> 
                  Share Combined Results
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <FinalShareDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen} 
      />
    </>
  );
};

export default CombinedStatsDialog;
