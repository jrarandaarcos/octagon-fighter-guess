
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fighter, fighters } from '@/data/fighters';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { generateDateSeed } from '@/utils/gameUtils';

const NicknameGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentFighterIndex, setCurrentFighterIndex] = useState<number>(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [fightersWithNicknames, setFightersWithNicknames] = useState<Fighter[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { toast } = useToast();
  
  const TOTAL_FIGHTERS = 7; // Limit to exactly 7 fighters

  // Function to get a new set of daily fighters
  const getDailyFighters = () => {
    // Get fighters with nicknames
    const validFighters = fighters.filter(fighter => fighter.nickname && fighter.nickname.trim() !== "");
    
    // Use the current date as seed for consistent daily selection
    const date = generateDateSeed();
    const seedNumber = parseInt(date.replace(/-/g, ''));
    
    // Fisher-Yates shuffle with seeded random
    const seededShuffle = (array: Fighter[]) => {
      const shuffled = [...array];
      let seedValue = seedNumber;
      
      for (let i = shuffled.length - 1; i > 0; i--) {
        // Generate next pseudo-random number based on seed
        seedValue = (seedValue * 9301 + 49297) % 233280;
        const rnd = seedValue / 233280;
        
        // Swap elements
        const j = Math.floor(rnd * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      return shuffled;
    };
    
    // Shuffle and take only the first 7
    return seededShuffle(validFighters).slice(0, TOTAL_FIGHTERS);
  };

  // Load daily fighters and check if game was already played today
  useEffect(() => {
    // Set document title
    document.title = "GuessTheFighter | Nickname Game";
    
    const currentDate = generateDateSeed();
    const lastPlayedDate = localStorage.getItem('nickname_game_last_played');
    const isNewDay = currentDate !== lastPlayedDate;
    
    // Check if game was completed today
    const wasCompleted = localStorage.getItem('nickname_game_completed') === 'true';
    
    if (isNewDay) {
      // It's a new day, reset everything
      const dailyFighters = getDailyFighters();
      setFightersWithNicknames(dailyFighters);
      setCurrentFighterIndex(0);
      setScore(0);
      setGameCompleted(false);
      localStorage.setItem('nickname_game_last_played', currentDate);
      localStorage.setItem('nickname_game_completed', 'false');
      localStorage.removeItem('nickname_game_progress');
    } else {
      // Same day, load saved state if it exists
      const dailyFighters = getDailyFighters(); // Get the same set based on date
      setFightersWithNicknames(dailyFighters);
      
      if (wasCompleted) {
        // Game was already completed today
        setGameCompleted(true);
        // Show the last fighter for better UX
        setCurrentFighterIndex(TOTAL_FIGHTERS - 1);
        // Set max score
        setScore(parseInt(localStorage.getItem('nickname_game_score') || '0'));
      } else {
        // Game in progress
        const savedProgress = localStorage.getItem('nickname_game_progress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          setCurrentFighterIndex(progress.fighterIndex);
          setScore(progress.score);
        }
      }
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (!gameCompleted) {
      localStorage.setItem('nickname_game_progress', JSON.stringify({
        fighterIndex: currentFighterIndex,
        score: score
      }));
      localStorage.setItem('nickname_game_score', score.toString());
    }
  }, [currentFighterIndex, score, gameCompleted]);

  const currentFighter = fightersWithNicknames[currentFighterIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentFighter || gameCompleted) return;

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
    // Check if this was the last fighter
    if (currentFighterIndex >= TOTAL_FIGHTERS - 1) {
      // Game finished
      toast({
        title: "Game Completed!",
        description: `Final score: ${score + 1}/${TOTAL_FIGHTERS}`,
      });
      setGameCompleted(true);
      localStorage.setItem('nickname_game_completed', 'true');
      localStorage.setItem('nickname_game_score', (score + 1).toString());
    } else {
      // Move to next fighter
      setCurrentFighterIndex(prev => prev + 1);
      setFeedback('');
      setGuess('');
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback(`The answer is: ${currentFighter?.name}`);
  };

  // Navigate back to main game when completed
  const handleGoBack = () => {
    navigate('/');
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
              <p className="text-sm text-muted-foreground">Fighter {currentFighterIndex + 1} of {TOTAL_FIGHTERS}</p>
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

            {gameCompleted ? (
              <div className="space-y-6">
                <div className="bg-green-950/50 border border-green-900 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-bold mb-2">Game Complete!</h3>
                  <p>Final score: {score}/{TOTAL_FIGHTERS}</p>
                  <p className="text-sm mt-2 text-muted-foreground">New fighters tomorrow at midnight</p>
                </div>
                
                <Button 
                  onClick={handleGoBack}
                  className="w-full bg-ufc-red hover:bg-red-700"
                >
                  Return to Main Game
                </Button>
              </div>
            ) : (
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
            )}

            {feedback && !gameCompleted && (
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
