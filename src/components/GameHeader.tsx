
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Help, Trophy, Menu } from 'lucide-react';
import HelpDialog from './HelpDialog';
import StatsDialog from './StatsDialog';
import PastFightersDialog from './PastFightersDialog';

interface GameHeaderProps {
  subtitle?: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ subtitle }) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 py-4">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          GuessTheFighter
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
        <div className="w-full flex justify-between items-center mt-4">
          <Button variant="ghost" size="icon" onClick={() => setPastOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setHelpOpen(true)}>
              <Help className="w-4 h-4 mr-2" />
              <span>Help</span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => setStatsOpen(true)}>
              <Trophy className="w-4 h-4 mr-2" />
              <span>Stats</span>
            </Button>
          </div>
        </div>
      </div>
      
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
      <StatsDialog open={statsOpen} onOpenChange={setStatsOpen} />
      <PastFightersDialog open={pastOpen} onOpenChange={setPastOpen} />
    </header>
  );
};

export default GameHeader;
