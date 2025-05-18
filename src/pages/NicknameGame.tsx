
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fighter, fighters } from '@/data/fighters';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const NicknameGame: React.FC = () => {
  const [currentFighterIndex, setCurrentFighterIndex] = React.useState<number>(0);
  const [guess, setGuess] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [fightersWithNicknames, setFightersWithNicknames] = React.useState<Fighter[]>([]);
  const { toast } = useToast();

  // Initialize the game with shuffled fighters (only those with non-empty nicknames)
  React.useEffect(() => {
    const validFighters = fighters.filter(fighter => fighter.nickname && fighter.nickname.trim() !== "");
    const shuffled = [...validFighters].sort(() => Math.random() - 0.5);
    setFightersWithNicknames(shuffled);
    // Set document title
    document.title = "GuessTheFighter | Nickname Game";
  }, []);

  const currentFighter = fightersWithNicknames[currentFighterIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentFighter) return;

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedAnswer = currentFighter.name.toLowerCase();
    
    if (normalizedGuess === normalizedAnswer) {
      // Correct guess
      setScore(prevScore => prevScore + 1);
      setFeedback(`Correct! "${currentFighter.nickname}" is ${currentFighter.name}!`);
      toast({
        title: "Correct!",
        description: `"${currentFighter.nickname}" is indeed ${currentFighter.name}!`,
      });
      setGuess('');
      setShowAnswer(false);
      // Move to next fighter
      setTimeout(() => {
        nextFighter();
      }, 1500);
    } else {
      // Wrong guess
      setFeedback(`Wrong guess. Try again or click "Show Answer".`);
    }
  };

  const nextFighter = () => {
    if (currentFighterIndex < fightersWithNicknames.length - 1) {
      setCurrentFighterIndex(prev => prev + 1);
      setFeedback('');
      setGuess('');
      setShowAnswer(false);
    } else {
      // Game finished
      toast({
        title: "Game Completed!",
        description: `Final score: ${score}/${fightersWithNicknames.length}`,
      });
      // Restart with new shuffled order
      const shuffled = [...fightersWithNicknames].sort(() => Math.random() - 0.5);
      setFightersWithNicknames(shuffled);
      setCurrentFighterIndex(0);
      setScore(0);
      setFeedback('');
      setGuess('');
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback(`The answer is: ${currentFighter?.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        <header className="flex flex-col items-center justify-center w-full px-4 py-3 border-b border-gray-800">
          <div className="w-full flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
              <span className="text-sm ml-1">Back to Main Game</span>
            </Link>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="octagon bg-ufc-red h-8 w-8 p-1 flex items-center justify-center">
                <span className="text-white font-bold text-xs">UFC</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight ml-2">Nickname Game</h1>
            </div>

            <div className="flex items-center justify-end opacity-0 w-[70px]">
              <Button variant="ghost" size="icon">
                <HelpCircle size={20} />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col p-4">
          <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
            <div className="mb-8 text-center">
              <p className="text-lg mb-2">Score: <span className="font-bold">{score}</span></p>
              <p className="text-sm text-muted-foreground">Fighter {currentFighterIndex + 1} of {fightersWithNicknames.length}</p>
            </div>

            {currentFighter && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Guess the fighter with the nickname:</h3>
                <p className="text-2xl font-bold py-4 text-center">"<span className="text-ufc-red">{currentFighter.nickname}</span>"</p>
                
                <div className="text-sm text-muted-foreground mt-4 space-y-1">
                  <p>Division: {currentFighter.division}</p>
                  <p>Country: {currentFighter.country}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Fighter's name..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="w-full"
                  disabled={showAnswer}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button 
                  type="submit" 
                  className="flex-1 bg-ufc-red hover:bg-red-700" 
                  disabled={!guess.trim() || showAnswer}
                >
                  Submit Guess
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleShowAnswer} 
                  disabled={showAnswer}
                >
                  Show Answer
                </Button>
                
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={nextFighter}
                >
                  Next Fighter
                </Button>
              </div>
            </form>

            {feedback && (
              <div className={`p-3 rounded-md text-center ${showAnswer ? 'bg-yellow-950 border border-yellow-900' : 'bg-muted'}`}>
                {feedback}
              </div>
            )}
          </div>
        </main>
        
        <footer className="border-t border-gray-800 py-4">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-sm text-muted-foreground text-center">
              Test your knowledge of UFC fighter nicknames
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NicknameGame;
