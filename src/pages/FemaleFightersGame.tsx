
import React from 'react';
import GameHeader from '@/components/GameHeader';
import GameBoard from '@/components/GameBoard';
import GameInput from '@/components/GameInput';
import GameResult from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const FemaleFightersGame = () => {
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
    document.title = "GuessTheFighter - Women";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        <GameHeader subtitle="Women Fighters Edition" />
        
        <div className="bg-muted/30 p-2 flex justify-center gap-2 border-b border-gray-800">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-muted">
              <Target size={16} />
              <span>Play Men's Edition</span>
            </Button>
          </Link>
          <Link to="/nickname-game" className="flex-1">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-muted">
              <Target size={16} />
              <span>Play Nickname Game</span>
            </Button>
          </Link>
        </div>
        
        <main className="flex-1 flex flex-col">
          <div className="max-w-3xl w-full mx-auto p-2 flex-1 flex flex-col">
            <GameBoard />
            <GameInput gameType="female" />
            <GameResult />
          </div>
        </main>
        
        <footer className="border-t border-gray-800 py-4">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock size={16} className="mr-2" />
              <span>Next fighter in: {getTimeUntilTomorrow()}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/past-fighters">Past Fighters</Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FemaleFightersGame;
