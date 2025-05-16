import React, { createContext, useContext, useState, useEffect } from 'react';
import { Fighter, fighters } from '../data/fighters';
import { 
  generateDateSeed, 
  getDaily, 
  compareAttributes, 
  saveGameStats, 
  loadGameStats, 
  saveGameState, 
  loadGameState,
  isNewDay
} from '../utils/gameUtils';
import { useToast } from '@/hooks/use-toast';

// Define the structure of our game state
interface GameState {
  dailyFighter: Fighter | null;
  guesses: Fighter[];
  guessResults: Array<{[key: string]: "correct" | "close" | "incorrect"}>;
  isGameOver: boolean;
  isWin: boolean;
  maxAttempts: number;
  currentHint: string | null;
}

// Define the structure of our game stats
interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string;
  guessDistribution: {[key: string]: number};
}

// Define the context interface
interface GameContextType {
  gameState: GameState;
  gameStats: GameStats;
  makeGuess: (fighter: Fighter) => void;
  resetGame: () => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    dailyFighter: null,
    guesses: [],
    guessResults: [],
    isGameOver: false,
    isWin: false,
    maxAttempts: 6,
    currentHint: null,
  });
  
  const [gameStats, setGameStats] = useState<GameStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayedDate: "",
    guessDistribution: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
    },
  });

  // Initialize or load the game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Load saved stats
    const savedStats = loadGameStats();
    setGameStats(savedStats);
    
    const currentDate = generateDateSeed();
    const lastPlayed = savedStats.lastPlayedDate;
    
    // Check if this is a new day
    if (isNewDay(lastPlayed)) {
      // It's a new day, start a fresh game
      const daily = getDaily(fighters, currentDate);
      
      // Make sure we have a valid daily fighter
      if (daily) {
        console.log("New daily fighter loaded:", daily.name);
        
        setGameState({
          dailyFighter: daily,
          guesses: [],
          guessResults: [],
          isGameOver: false,
          isWin: false,
          maxAttempts: 6,
          currentHint: null,
        });
        
        // Add previous day's fighter to past fighters if it exists
        if (lastPlayed) {
          const previousGameState = loadGameState();
          if (previousGameState && previousGameState.dailyFighter) {
            addToPastFighters(
              lastPlayed, 
              previousGameState.dailyFighter.name, 
              previousGameState.isWin
            );
          }
        }
      } else {
        console.error("Failed to load daily fighter");
        // Provide a fallback fighter
        const fallbackFighter = fighters[0];
        setGameState({
          dailyFighter: fallbackFighter,
          guesses: [],
          guessResults: [],
          isGameOver: false,
          isWin: false,
          maxAttempts: 6,
          currentHint: null,
        });
      }
    } else {
      // Same day, load saved state
      const savedState = loadGameState();
      if (savedState && savedState.dailyFighter) {
        console.log("Loaded saved game state with fighter:", savedState.dailyFighter.name);
        setGameState(savedState);
      } else {
        // Fallback if no saved state or invalid daily fighter
        console.log("No valid saved state, getting new daily fighter");
        const daily = getDaily(fighters, currentDate);
        
        // Double check we have a valid daily fighter
        if (daily) {
          setGameState({
            dailyFighter: daily,
            guesses: [],
            guessResults: [],
            isGameOver: false,
            isWin: false,
            maxAttempts: 6,
            currentHint: null,
          });
        } else {
          console.error("Failed to load daily fighter on fallback");
          // Use the first fighter as a last resort
          setGameState({
            dailyFighter: fighters[0],
            guesses: [],
            guessResults: [],
            isGameOver: false,
            isWin: false,
            maxAttempts: 6,
            currentHint: null,
          });
        }
      }
    }
  };

  // Add fighter to past fighters list
  const addToPastFighters = (date: string, name: string, wasGuessed: boolean) => {
    const pastFightersJson = localStorage.getItem('ufcdle_past_fighters');
    let pastFighters = [];
    
    if (pastFightersJson) {
      try {
        pastFighters = JSON.parse(pastFightersJson);
      } catch (e) {
        pastFighters = [];
      }
    }
    
    // Add new fighter to the beginning of the array
    pastFighters.unshift({ date, name, wasGuessed });
    
    // Keep only the last 30 days
    if (pastFighters.length > 30) {
      pastFighters = pastFighters.slice(0, 30);
    }
    
    localStorage.setItem('ufcdle_past_fighters', JSON.stringify(pastFighters));
  };

  // Make a guess
  const makeGuess = (fighter: Fighter) => {
    if (gameState.isGameOver || !gameState.dailyFighter) return;
    
    // Compare the guessed fighter with the daily fighter
    const result: {[key: string]: "correct" | "close" | "incorrect"} = {};
    
    // Compare each attribute
    result.name = fighter.id === gameState.dailyFighter.id ? "correct" : "incorrect";
    result.country = compareAttributes(fighter.country, gameState.dailyFighter.country, "country");
    result.division = compareAttributes(fighter.division, gameState.dailyFighter.division, "division");
    result.debutYear = compareAttributes(fighter.debutYear, gameState.dailyFighter.debutYear, "debutYear");
    result.debutEvent = fighter.debutEvent === gameState.dailyFighter.debutEvent ? "correct" : "incorrect";
    result.record = compareAttributes(fighter.record, gameState.dailyFighter.record, "record");
    result.fightingStyle = compareAttributes(fighter.fightingStyle, gameState.dailyFighter.fightingStyle, "fightingStyle");
    
    // Check if the guess is correct
    const isCorrect = fighter.id === gameState.dailyFighter.id;
    
    // Update state with the new guess
    const newGuesses = [...gameState.guesses, fighter];
    const newResults = [...gameState.guessResults, result];
    
    // Check if game is over (correct guess or max attempts reached)
    const attemptsLeft = gameState.maxAttempts - newGuesses.length;
    const isGameOver = isCorrect || attemptsLeft === 0;
    
    // Show hint after 3 failed attempts
    let hint = gameState.currentHint;
    if (newGuesses.length === 3 && !isCorrect && !hint) {
      // Choose a hint attribute
      const hintOptions = [
        `This fighter is from ${gameState.dailyFighter.country}.`,
        `This fighter competes in the ${gameState.dailyFighter.division} division.`,
        `This fighter made their UFC debut in ${gameState.dailyFighter.debutYear}.`,
        `This fighter's fighting style includes ${gameState.dailyFighter.fightingStyle.split(', ')[0]}.`
      ];
      hint = hintOptions[Math.floor(Math.random() * hintOptions.length)];
      
      toast({
        title: "Hint unlocked!",
        description: "You've unlocked a hint to help you out.",
      });
    }
    
    // Update game state
    const newGameState = {
      ...gameState,
      guesses: newGuesses,
      guessResults: newResults,
      isGameOver: isGameOver,
      isWin: isCorrect,
      currentHint: hint,
    };
    
    setGameState(newGameState);
    
    // Save the game state
    saveGameState(
      gameState.dailyFighter,
      newGuesses,
      newResults
    );
    
    // Update stats if game is over
    if (isGameOver) {
      updateGameStats(isCorrect, newGuesses.length);
    }
  };

  // Update game statistics
  const updateGameStats = (won: boolean, attempts: number) => {
    const currentDate = generateDateSeed();
    const newStats = { ...gameStats };
    
    // Update basic stats
    newStats.gamesPlayed += 1;
    
    if (won) {
      newStats.gamesWon += 1;
      newStats.currentStreak += 1;
      newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak);
      
      // Update guess distribution
      if (attempts >= 1 && attempts <= 6) {
        newStats.guessDistribution[attempts.toString()] += 1;
      }
    } else {
      newStats.currentStreak = 0;
    }
    
    newStats.lastPlayedDate = currentDate;
    
    // Save updated stats
    setGameStats(newStats);
    saveGameStats(
      newStats.gamesPlayed,
      newStats.gamesWon,
      newStats.currentStreak,
      newStats.maxStreak,
      newStats.lastPlayedDate,
      newStats.guessDistribution
    );
    
    // Add to past fighters
    if (gameState.dailyFighter) {
      addToPastFighters(
        currentDate,
        gameState.dailyFighter.name,
        won
      );
    }
  };

  // Reset game (for testing)
  const resetGame = () => {
    localStorage.removeItem("ufcdle_state");
    localStorage.removeItem("ufcdle_stats");
    initializeGame();
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameStats,
        makeGuess,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
