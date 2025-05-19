import React from 'react';
import { Fighter, fighters } from '../data/fighters';
import { useGameContext } from '../context/GameContext';
import SearchInput from './SearchInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface GameInputProps {
  gameType?: 'male' | 'female' | 'nickname';
}

const GameInput: React.FC<GameInputProps> = ({ gameType = 'male' }) => {
  const { toast } = useToast();
  const { gameState, makeGuess, currentGameType, setCurrentGameType } = useGameContext();
  const { isGameOver, guesses, currentHint } = gameState;
  
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
        <div></div> // Empty div instead of button - the next game buttons are in GameResult now
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
    </div>
  );
};

export default GameInput;
