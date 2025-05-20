import React from 'react';
import GameHeader from '@/components/GameHeader';
import GameBoard from '@/components/GameBoard';
import GameInput from '@/components/GameInput';
import GameResult from '@/components/GameResult';
import GameNavigation from '@/components/GameNavigation';
import { Button } from '@/components/ui/button';
import { BarChart2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import CombinedStatsDialog from '@/components/CombinedStatsDialog';

const MaleFightersGame = () => {
  const { setCurrentGameType, gameCompletionStatus } = useGameContext();
  const [combinedStatsOpen, setCombinedStatsOpen] = React.useState(false);
  
  // Check if at least two games are completed
  const atLeastTwoGamesCompleted = 
    (gameCompletionStatus.male && gameCompletionStatus.female) ||
    (gameCompletionStatus.male && gameCompletionStatus.nickname) ||
    (gameCompletionStatus.female && gameCompletionStatus.nickname);
  
  // Set correct game type when component mounts
  React.useEffect(() => {
    setCurrentGameType('male');
  }, [setCurrentGameType]);
  
  // Calculate time until next fighter
  const getTimeUntilTomorrow = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diffMs = tomorrow.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  // Set document title
  React.useEffect(() => {
    document.title = "GuessTheFighter - Male";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        <GameHeader subtitle="Male Fighters Edition" />
        
        <main className="flex-1 flex flex-col">
          <div className="max-w-3xl w-full mx-auto p-2 flex-1 flex flex-col">
            <GameBoard />
            <GameInput gameType="male" />
            <GameResult />
            <GameNavigation />
          </div>
        </main>
        
        <footer className="border-t border-gray-800 py-4">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock size={16} className="mr-2" />
              <span>Next fighter in: {getTimeUntilTomorrow()}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {atLeastTwoGamesCompleted && (
                <Button variant="ghost" size="sm" onClick={() => setCombinedStatsOpen(true)}>
                  <BarChart2 size={16} className="mr-2" /> Combined Stats
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/past-fighters">Past Fighters</Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
      
      <CombinedStatsDialog
        open={combinedStatsOpen}
        onOpenChange={setCombinedStatsOpen}
      />
    </div>
  );
};

export default MaleFightersGame;
