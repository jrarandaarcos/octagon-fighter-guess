import React from 'react';
import { Fighter, fighters } from '../data/fighters';
import { useGameContext } from '../context/GameContext';
import SearchInput from './SearchInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GameInput: React.FC = () => {
  const { toast } = useToast();
  const { gameState, makeGuess } = useGameContext();
  const { isGameOver, guesses, currentHint } = gameState;
  
  // Keep track of which fighters have already been guessed
  const guessedFighterIds = guesses.map(fighter => fighter.id);
  const availableFighters = fighters.filter(fighter => !guessedFighterIds.includes(fighter.id));

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
        <div className="text-center space-y-4">
          <Button onClick={handleNewGame} className="bg-ufc-red hover:bg-red-600">
            Next Fighter Tomorrow
          </Button>
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
    </div>
  );
};

export default GameInput;
