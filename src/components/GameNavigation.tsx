
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

const GameNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, currentGameType, gameCompletionStatus } = useGameContext();
  const { isGameOver } = gameState;

  // Only show navigation when current game is completed
  if (!isGameOver || !gameCompletionStatus[currentGameType]) {
    return null;
  }

  // Get the next game information based on current game type
  const getNextGame = () => {
    if (currentGameType === 'male' && !gameCompletionStatus.female) {
      return {
        path: '/female-fighters',
        text: "Play Women's Edition"
      };
    } 
    else if ((currentGameType === 'male' || currentGameType === 'female') && !gameCompletionStatus.nickname) {
      return {
        path: '/nickname-game',
        text: "Play Nickname Game"
      };
    }
    return null;
  };

  const nextGame = getNextGame();
  
  // If no next game, don't render anything
  if (!nextGame) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50 px-4">
      <Button 
        onClick={() => navigate(nextGame.path)}
        className="bg-green-600 hover:bg-green-700 text-white shadow-lg text-lg py-6"
        size="lg"
      >
        {nextGame.text} <ArrowRight size={20} className="ml-2" />
      </Button>
    </div>
  );
};

export default GameNavigation;
