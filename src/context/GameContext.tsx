
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

// Define game completion status
interface GameCompletionStatus {
  male: boolean;
  female: boolean;
  nickname: boolean;
  lastUpdated: string;
}

// Define the context interface
interface GameContextType {
  gameState: GameState;
  gameStats: GameStats;
  makeGuess: (fighter: Fighter, gameType?: 'male' | 'female' | 'nickname') => void;
  resetGame: () => void;
  setCurrentGameType: (type: 'male' | 'female' | 'nickname') => void;
  currentGameType: 'male' | 'female' | 'nickname';
  gameCompletionStatus: GameCompletionStatus;
  getAllGameStats: () => {
    male: GameStats;
    female: GameStats;
    nickname: GameStats;
  };
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { toast } = useToast();
  const [currentGameType, setCurrentGameType] = useState<'male' | 'female' | 'nickname'>('male');
  
  // Create separate game states for different game types
  const [maleGameState, setMaleGameState] = useState<GameState>({
    dailyFighter: null,
    guesses: [],
    guessResults: [],
    isGameOver: false,
    isWin: false,
    maxAttempts: 6,
    currentHint: null,
  });
  
  const [femaleGameState, setFemaleGameState] = useState<GameState>({
    dailyFighter: null,
    guesses: [],
    guessResults: [],
    isGameOver: false,
    isWin: false,
    maxAttempts: 6,
    currentHint: null,
  });
  
  const [nicknameGameState, setNicknameGameState] = useState<GameState>({
    dailyFighter: null,
    guesses: [],
    guessResults: [],
    isGameOver: false,
    isWin: false,
    maxAttempts: 6,
    currentHint: null,
  });
  
  // Create separate game stats for different game types
  const [maleGameStats, setMaleGameStats] = useState<GameStats>(getInitialGameStats());
  const [femaleGameStats, setFemaleGameStats] = useState<GameStats>(getInitialGameStats());
  const [nicknameGameStats, setNicknameGameStats] = useState<GameStats>(getInitialGameStats());
  
  // Track game completion status
  const [gameCompletionStatus, setGameCompletionStatus] = useState<GameCompletionStatus>({
    male: false,
    female: false,
    nickname: false,
    lastUpdated: "",
  });

  // Helper function to get initial game stats
  function getInitialGameStats(): GameStats {
    return {
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
    };
  }

  // Get the current game state based on game type
  const gameState = currentGameType === 'male' 
    ? maleGameState 
    : currentGameType === 'female' 
      ? femaleGameState 
      : nicknameGameState;
  
  // Get the current game stats based on game type
  const gameStats = currentGameType === 'male'
    ? maleGameStats
    : currentGameType === 'female'
      ? femaleGameStats
      : nicknameGameStats;
  
  // Set the current game state based on game type
  const setGameState = (newState: GameState) => {
    if (currentGameType === 'male') {
      setMaleGameState(newState);
    } else if (currentGameType === 'female') {
      setFemaleGameState(newState);
    } else {
      setNicknameGameState(newState);
    }
  };
  
  // Set the current game stats based on game type
  const setGameStats = (newStats: GameStats) => {
    if (currentGameType === 'male') {
      setMaleGameStats(newStats);
    } else if (currentGameType === 'female') {
      setFemaleGameStats(newStats);
    } else {
      setNicknameGameStats(newStats);
    }
  };
  
  // Get all game stats regardless of current game type
  const getAllGameStats = () => {
    return {
      male: maleGameStats,
      female: femaleGameStats,
      nickname: nicknameGameStats
    };
  };

  // Load game completion status
  useEffect(() => {
    const currentDate = generateDateSeed();
    const savedCompletionStatus = localStorage.getItem('ufcdle_game_completion');
    
    if (savedCompletionStatus) {
      const parsed = JSON.parse(savedCompletionStatus);
      
      // If it's a new day, reset completion status
      if (parsed.lastUpdated !== currentDate) {
        const resetStatus = {
          male: false,
          female: false,
          nickname: false,
          lastUpdated: currentDate
        };
        setGameCompletionStatus(resetStatus);
        localStorage.setItem('ufcdle_game_completion', JSON.stringify(resetStatus));
      } else {
        setGameCompletionStatus(parsed);
      }
    } else {
      const initialStatus = {
        male: false,
        female: false,
        nickname: false,
        lastUpdated: currentDate
      };
      setGameCompletionStatus(initialStatus);
      localStorage.setItem('ufcdle_game_completion', JSON.stringify(initialStatus));
    }
  }, []);

  // Initialize or load the game
  useEffect(() => {
    initializeGame();
  }, [currentGameType]);

  const initializeGame = () => {
    // Get the storage key suffix based on game type
    const storageKeySuffix = currentGameType === 'male' 
      ? '_male' 
      : currentGameType === 'female' 
        ? '_female' 
        : '_nickname';
    
    // Load saved stats
    const savedStats = loadGameStats(storageKeySuffix);
    setGameStats(savedStats);
    
    const currentDate = generateDateSeed();
    const lastPlayed = savedStats.lastPlayedDate;
    
    // Check if this is a new day
    if (isNewDay(lastPlayed)) {
      // It's a new day, start a fresh game
      let gameFighters = fighters;
      
      // Filter fighters based on game type
      if (currentGameType === 'male') {
        gameFighters = fighters.filter(fighter => !fighter.division.includes("Women's"));
      } else if (currentGameType === 'female') {
        gameFighters = fighters.filter(fighter => fighter.division.includes("Women's"));
      }
      
      const daily = getDaily(gameFighters, currentDate + storageKeySuffix);
      
      // Make sure we have a valid daily fighter
      if (daily) {
        console.log(`New daily fighter loaded for ${currentGameType} game:`, daily.name);
        
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
          const previousGameState = loadGameState(storageKeySuffix);
          if (previousGameState && previousGameState.dailyFighter) {
            addToPastFighters(
              lastPlayed, 
              previousGameState.dailyFighter.name, 
              previousGameState.isWin,
              storageKeySuffix
            );
          }
        }
      } else {
        console.error(`Failed to load daily fighter for ${currentGameType} game`);
        // Provide a fallback fighter
        const fallbackFighter = gameFighters[0];
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
      const savedState = loadGameState(storageKeySuffix);
      if (savedState && savedState.dailyFighter) {
        console.log(`Loaded saved game state for ${currentGameType} with fighter:`, savedState.dailyFighter.name);
        setGameState(savedState);
      } else {
        // Fallback if no saved state or invalid daily fighter
        console.log(`No valid saved state for ${currentGameType}, getting new daily fighter`);
        
        let gameFighters = fighters;
        
        // Filter fighters based on game type
        if (currentGameType === 'male') {
          gameFighters = fighters.filter(fighter => !fighter.division.includes("Women's"));
        } else if (currentGameType === 'female') {
          gameFighters = fighters.filter(fighter => fighter.division.includes("Women's"));
        }
        
        const daily = getDaily(gameFighters, currentDate + storageKeySuffix);
        
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
          console.error(`Failed to load daily fighter on fallback for ${currentGameType} game`);
          // Use the first fighter as a last resort
          setGameState({
            dailyFighter: gameFighters[0],
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
  const addToPastFighters = (date: string, name: string, wasGuessed: boolean, storageKeySuffix: string = '') => {
    const storageKey = `ufcdle_past_fighters${storageKeySuffix}`;
    const pastFightersJson = localStorage.getItem(storageKey);
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
    
    localStorage.setItem(storageKey, JSON.stringify(pastFighters));
  };

  // Make a guess
  const makeGuess = (fighter: Fighter, gameType?: 'male' | 'female' | 'nickname') => {
    // Update current game type if provided
    if (gameType && gameType !== currentGameType) {
      setCurrentGameType(gameType);
      return; // We'll initialize the new game type in the useEffect
    }
    
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
    
    // Get the storage key suffix based on game type
    const storageKeySuffix = currentGameType === 'male' 
      ? '_male' 
      : currentGameType === 'female' 
        ? '_female' 
        : '_nickname';
    
    // Save the game state
    saveGameState(
      gameState.dailyFighter,
      newGuesses,
      newResults,
      storageKeySuffix
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
    
    // Get the storage key suffix based on game type
    const storageKeySuffix = currentGameType === 'male' 
      ? '_male' 
      : currentGameType === 'female' 
        ? '_female' 
        : '_nickname';
    
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
      newStats.guessDistribution,
      storageKeySuffix
    );
    
    // Update game completion status
    const newCompletionStatus = {...gameCompletionStatus};
    if (currentGameType === 'male') {
      newCompletionStatus.male = true;
    } else if (currentGameType === 'female') {
      newCompletionStatus.female = true;
    } else if (currentGameType === 'nickname') {
      newCompletionStatus.nickname = true;
    }
    
    newCompletionStatus.lastUpdated = currentDate;
    setGameCompletionStatus(newCompletionStatus);
    localStorage.setItem('ufcdle_game_completion', JSON.stringify(newCompletionStatus));
    
    // Add to past fighters
    if (gameState.dailyFighter) {
      addToPastFighters(
        currentDate,
        gameState.dailyFighter.name,
        won,
        storageKeySuffix
      );
    }
  };

  // Reset game (for testing)
  const resetGame = () => {
    const storageKeySuffix = currentGameType === 'male' 
      ? '_male' 
      : currentGameType === 'female' 
        ? '_female' 
        : '_nickname';
        
    localStorage.removeItem(`ufcdle_state${storageKeySuffix}`);
    localStorage.removeItem(`ufcdle_stats${storageKeySuffix}`);
    initializeGame();
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameStats,
        makeGuess,
        resetGame,
        setCurrentGameType,
        currentGameType,
        gameCompletionStatus,
        getAllGameStats,
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
