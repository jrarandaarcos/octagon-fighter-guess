
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import Confetti from './Confetti';

const GameResult: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { gameState } = useGameContext();
  const { isGameOver, isWin, dailyFighter } = gameState;

  // Show the result when the game is over
  useEffect(() => {
    if (isGameOver && !open) {
      // Small delay to show the result
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isGameOver, open]);

  return (
    <>
      {isWin && <Confetti />}
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isWin ? "Congratulations!" : "Better luck next time!"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-center mb-2">
                {isWin
                  ? "You correctly guessed today's fighter!"
                  : "You didn't guess today's fighter."}
              </p>
              <div className="text-center font-bold text-xl">{dailyFighter.name}</div>
              <div className="text-center text-sm text-muted-foreground">
                {dailyFighter.division} • {dailyFighter.country}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Record:</span> {dailyFighter.record}</div>
              <div><span className="font-medium">Style:</span> {dailyFighter.fightingStyle}</div>
              <div><span className="font-medium">Debut:</span> {dailyFighter.debutYear}</div>
              <div><span className="font-medium">Event:</span> {dailyFighter.debutEvent}</div>
            </div>
            
            <div className="flex justify-center pt-2">
              <Button 
                onClick={() => setShowShare(true)}
                className="bg-ufc-red hover:bg-red-600 text-white"
              >
                <Share2 size={16} className="mr-2" /> 
                Share Result
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameResult;
