
import React from 'react';
import { Fighter, fighters } from '../data/fighters';
import { useGameContext } from '../context/GameContext';
import SearchInput from './SearchInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BarChart2 } from 'lucide-react';
import CombinedStatsDialog from './CombinedStatsDialog';

interface GameInputProps {
  gameType?: 'male' | 'female' | 'nickname';
}

const GameInput: React.FC<GameInputProps> = ({ gameType = 'male' }) => {
  const { toast } = useToast();
  const { gameState, makeGuess, currentGameType, setCurrentGameType, gameCompletionStatus } = useGameContext();
  const { isGameOver, guesses, currentHint } = gameState;
  const [combinedStatsOpen, setCombinedStatsOpen] = React.useState(false);
  
  // Check if at least two games are completed
  const atLeastTwoGamesCompleted = 
    (gameCompletionStatus.male && gameCompletionStatus.female) ||
    (gameCompletionStatus.male && gameCompletionStatus.nickname) ||
    (gameCompletionStatus.female && gameCompletionStatus.nickname);
  
  // Set the current game type
  React.useEffect(() => {
    if (gameType !== currentGameType) {
      setCurrentGameType(gameType);
    }
  }, [gameType, currentGameType, setCurrentGameType]);
  
  // Filter fighters by gender if specified
  let availableFighters = fighters;
  
  if (gameType === 'male') {
    availableFighters = fighters.filter(fighter => 
      !fighter.division.includes("Women's")
    );
  } else if (gameType === 'female') {
    availableFighters = fighters.filter(fighter => 
      fighter.division.includes("Women's")
    );
  }
  
  // Keep track of which fighters have already been guessed
  const guessedFighterIds = guesses.map(fighter => fighter.id);
  availableFighters = availableFighters.filter(fighter => !guessedFighterIds.includes(fighter.id));

  const handleSelectFighter = (fighter: Fighter) => {
    makeGuess(fighter);
  };
  
  // Handle new game button click
  const handleNewGame = () => {
    // Since we rely on the date for daily fighter, just inform the user
    toast({
      title: "Next fighter tomorrow!",
      description: "A new fighter will be available at midnight local time.",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      {isGameOver ? (
        <div className="flex justify-center">
          {atLeastTwoGamesCompleted && (
            <Button 
              variant="outline" 
              onClick={() => setCombinedStatsOpen(true)}
              className="mt-4"
            >
              <BarChart2 size={16} className="mr-2" /> View Combined Stats
            </Button>
          )}
        </div>
      ) : (
        <>
          <SearchInput 
            fighters={availableFighters}
            onSelectFighter={handleSelectFighter}
          />
          
          {currentHint && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <span className="font-semibold">Hint:</span> {currentHint}
            </div>
          )}
        </>
      )}
      
      <CombinedStatsDialog
        open={combinedStatsOpen}
        onOpenChange={setCombinedStatsOpen}
      />
    </div>
  );
};

export default GameInput;
