
import React from 'react';
import { Fighter } from '../data/fighters';
import { useGameContext } from '../context/GameContext';
import GuessRow from './GuessRow';

const GameBoard: React.FC = () => {
  const { gameState } = useGameContext();
  const { guesses, guessResults, maxAttempts, dailyFighter } = gameState;

  // Early return if dailyFighter is null to prevent rendering until it's loaded
  if (!dailyFighter) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 flex justify-center items-center h-64">
        <div className="text-muted-foreground">Loading game...</div>
      </div>
    );
  }
  
  // Create empty rows for remaining attempts
  const emptyRows = [];
  for (let i = guesses.length; i < maxAttempts; i++) {
    emptyRows.push(<GuessRow key={`empty-${i}`} />);
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="space-y-2">
        {/* Column Headers */}
        <GuessRow showHeaders={true} />
        
        {/* Guessed rows */}
        {guesses.map((guess, index) => (
          <GuessRow
            key={`guess-${index}`}
            fighter={guess}
            result={guessResults[index]}
            targetYear={dailyFighter?.debutYear}
          />
        ))}
        
        {/* Empty rows */}
        {emptyRows}
      </div>
    </div>
  );
};

export default GameBoard;
