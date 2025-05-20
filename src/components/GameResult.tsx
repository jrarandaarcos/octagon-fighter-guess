
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, ArrowRight, BarChart2 } from 'lucide-react';
import Confetti from './Confetti';
import ShareDialog from './ShareDialog';
import CombinedStatsDialog from './CombinedStatsDialog';

const GameResult: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [combinedStatsOpen, setCombinedStatsOpen] = useState(false);
  const [resultShown, setResultShown] = useState(false);
  
  const { gameState, currentGameType, gameCompletionStatus } = useGameContext();
  const { isGameOver, isWin, dailyFighter } = gameState;

  // Show the result when the game is over
  useEffect(() => {
    if (isGameOver && !resultShown) {
      // Small delay to show the result
      const timer = setTimeout(() => {
        setOpen(true);
        setResultShown(true); // Mark that we've shown the result
      }, 1000);

      return () => clearTimeout(timer);
    } else if (!isGameOver) {
      // Reset the resultShown flag when starting a new game
      setResultShown(false);
    }
  }, [isGameOver, resultShown]);

  const handleNextGame = () => {
    setOpen(false);
    // If current game is male, go to female game
    if (currentGameType === 'male') {
      navigate('/female-fighters');
    } 
    // If current game is female, go to nickname game
    else if (currentGameType === 'female') {
      navigate('/nickname-game');
    }
  };

  // Check if at least two games are completed
  const atLeastTwoGamesCompleted = 
    (gameCompletionStatus.male && gameCompletionStatus.female) ||
    (gameCompletionStatus.male && gameCompletionStatus.nickname) ||
    (gameCompletionStatus.female && gameCompletionStatus.nickname);

  // Early return if dailyFighter is null
  if (!dailyFighter) {
    return null; // Don't render anything if dailyFighter is null
  }

  // Get the text for the next game button based on current game type
  const getNextGameText = () => {
    if (currentGameType === 'male') {
      return "Play Women's Edition";
    } else if (currentGameType === 'female') {
      return "Play Nickname Game";
    }
    return null;
  };

  const nextGameText = getNextGameText();

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
            
            <div className="flex flex-col sm:flex-row justify-center gap-2 pt-2">
              <Button 
                onClick={() => setShareDialogOpen(true)}
                className="bg-ufc-red hover:bg-red-600 text-white"
              >
                <Share2 size={16} className="mr-2" /> 
                Share Result
              </Button>

              {/* Only show next game button if there is one */}
              {nextGameText && (
                <Button 
                  onClick={handleNextGame}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {nextGameText} <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
              
              {/* Show combined stats button if at least two games are completed */}
              {atLeastTwoGamesCompleted && (
                <Button 
                  onClick={() => setCombinedStatsOpen(true)}
                  variant="outline"
                >
                  <BarChart2 size={16} className="mr-2" /> Combined Stats
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <ShareDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen} 
      />
      
      <CombinedStatsDialog
        open={combinedStatsOpen}
        onOpenChange={setCombinedStatsOpen}
      />
    </>
  );
};

export default GameResult;
