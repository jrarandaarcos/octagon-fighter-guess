
import { Fighter } from "../data/fighters";
import { GameStats } from "../types/game";

// Generate a seed based on date for consistent results for each day
export const generateDateSeed = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

// Get a deterministic fighter based on the date
export const getDaily = (fighters: Fighter[], seed: string): Fighter => {
  // Convert seed to a number by summing char codes
  let seedValue = 0;
  for (let i = 0; i < seed.length; i++) {
    seedValue += seed.charCodeAt(i);
  }
  
  // Use the seed to get a consistent fighter for the day
  const index = seedValue % fighters.length;
  return fighters[index];
};

// Compare two fighter attributes and determine how close they are
export const compareAttributes = (
  guess: string | number,
  answer: string | number,
  attribute: string
): "correct" | "close" | "incorrect" => {
  if (guess === answer) return "correct";

  // Special handling for different attribute types
  switch (attribute) {
    case "debutYear":
      const yearDiff = Math.abs(Number(guess) - Number(answer));
      return yearDiff <= 2 ? "close" : "incorrect";
    
    case "division":
      // Check if divisions are in the same weight class family
      const weightClasses = {
        "Heavyweight": ["Heavyweight", "Light Heavyweight"],
        "Light Heavyweight": ["Heavyweight", "Light Heavyweight", "Middleweight"],
        "Middleweight": ["Light Heavyweight", "Middleweight", "Welterweight"],
        "Welterweight": ["Middleweight", "Welterweight", "Lightweight"],
        "Lightweight": ["Welterweight", "Lightweight", "Featherweight"],
        "Featherweight": ["Lightweight", "Featherweight", "Bantamweight"],
        "Bantamweight": ["Featherweight", "Bantamweight", "Flyweight"],
        "Flyweight": ["Bantamweight", "Flyweight"],
        "Women's Bantamweight": ["Women's Featherweight", "Women's Bantamweight", "Women's Flyweight"],
        "Women's Flyweight": ["Women's Bantamweight", "Women's Flyweight", "Women's Strawweight"],
        "Women's Strawweight": ["Women's Flyweight", "Women's Strawweight"]
      };
      
      // @ts-ignore - we're checking for key existence
      return weightClasses[answer]?.includes(guess) ? "close" : "incorrect";
    
    case "record":
      // Extract wins, losses, draws
      const [guessW, guessL, guessD] = guess.toString().split('-').map(Number);
      const [answerW, answerL, answerD] = answer.toString().split('-').map(Number);
      
      // If wins are within 3 and losses are within 3
      const winDiff = Math.abs(guessW - answerW);
      const lossDiff = Math.abs(guessL - answerL);
      
      return (winDiff <= 3 && lossDiff <= 3) ? "close" : "incorrect";
    
    case "country":
      // Basic geographic regions for similarity
      const regions: {[key: string]: string[]} = {
        "North America": ["United States", "Canada", "Mexico"],
        "South America": ["Brazil", "Ecuador", "Colombia", "Argentina", "Chile", "Peru"],
        "Europe": ["United Kingdom", "Ireland", "France", "Germany", "Poland", "Russia", "Spain", "Sweden", "Austria", "Czech Republic"],
        "Africa": ["Nigeria", "Cameroon", "South Africa"],
        "Asia": ["China", "Japan", "Kazakhstan", "Kyrgyzstan", "Armenia", "Georgia", "Azerbaijan", "Iran"],
        "Oceania": ["Australia", "New Zealand"]
      };
      
      // Find regions for both guess and answer
      let guessRegion = "";
      let answerRegion = "";
      
      for (const [region, countries] of Object.entries(regions)) {
        if (countries.includes(guess.toString())) guessRegion = region;
        if (countries.includes(answer.toString())) answerRegion = region;
      }
      
      return guessRegion === answerRegion && guessRegion !== "" ? "close" : "incorrect";
    
    case "fightingStyle":
      // Check if they share any fighting styles
      const guessStyles = guess.toString().split(", ");
      const answerStyles = answer.toString().split(", ");
      
      return guessStyles.some(style => answerStyles.includes(style)) ? "close" : "incorrect";
      
    default:
      return "incorrect";
  }
};

// Format result to share
export const formatShareResult = (
  attempts: number,
  maxAttempts: number,
  won: boolean,
  guessResults: Array<{[key: string]: "correct" | "close" | "incorrect"}>
): string => {
  const emojis = {
    correct: "🟩",
    close: "🟨",
    incorrect: "🟥",
  };
  
  let shareText = `GuessTheFighter ${generateDateSeed()} ${won ? attempts : "X"}/${maxAttempts}\n\n`;
  
  guessResults.forEach((result) => {
    const resultEmojis = Object.values(result).map((r) => emojis[r]).join("");
    shareText += `${resultEmojis}\n`;
  });
  
  return shareText;
};

// Format combined results to share
export const formatCombinedShareResult = (
  gameCompletionStatus: { male: boolean; female: boolean; nickname: boolean; lastUpdated: string },
  maleStats: GameStats,
  femaleStats: GameStats, 
  nicknameScore: number
): string => {
  const currentDate = generateDateSeed();
  let shareText = `📊 UFC Fighter Guessing Games - ${currentDate} 📊\n\n`;
  
  // Add male game results
  if (gameCompletionStatus.male) {
    const maleFighterResult = maleStats.lastPlayedDate === currentDate && maleStats.gamesPlayed > 0
      ? (maleStats.gamesWon > 0 ? `✅ (${Object.values(maleStats.guessDistribution).findIndex(val => val > 0) + 1}/6)` : "❌")
      : "❓";
      
    shareText += `👨 Male Fighter: ${maleFighterResult}\n`;
  }
  
  // Add female game results  
  if (gameCompletionStatus.female) {
    const femaleFighterResult = femaleStats.lastPlayedDate === currentDate && femaleStats.gamesPlayed > 0
      ? (femaleStats.gamesWon > 0 ? `✅ (${Object.values(femaleStats.guessDistribution).findIndex(val => val > 0) + 1}/6)` : "❌")
      : "❓";
      
    shareText += `👩 Female Fighter: ${femaleFighterResult}\n`;
  }
  
  // Add nickname game results
  if (gameCompletionStatus.nickname) {
    shareText += `📝 Nickname Game: ${nicknameScore}/7\n`;
  }
  
  shareText += "\nPlay at GuessTheFighter.com";
  
  return shareText;
};

// Check if a new day has started since last play
export const isNewDay = (lastPlayedDate: string): boolean => {
  const currentDate = generateDateSeed();
  return lastPlayedDate !== currentDate;
};

// Save game stats to localStorage
export const saveGameStats = (
  gamesPlayed: number,
  gamesWon: number,
  currentStreak: number,
  maxStreak: number,
  lastPlayedDate: string,
  guessDistribution: {[key: string]: number},
  storageSuffix: string = ''
): void => {
  const stats = {
    gamesPlayed,
    gamesWon,
    currentStreak,
    maxStreak,
    lastPlayedDate,
    guessDistribution,
  };
  
  localStorage.setItem(`ufcdle_stats${storageSuffix}`, JSON.stringify(stats));
};

// Load game stats from localStorage
export const loadGameStats = (storageSuffix: string = '') => {
  const statsJson = localStorage.getItem(`ufcdle_stats${storageSuffix}`);
  
  if (!statsJson) {
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
  
  return JSON.parse(statsJson);
};

// Save current game state
export const saveGameState = (
  dailyFighter: Fighter,
  guesses: Fighter[],
  guessResults: Array<{[key: string]: "correct" | "close" | "incorrect"}>,
  storageSuffix: string = ''
): void => {
  const gameState = {
    dailyFighter,
    guesses,
    guessResults,
  };
  
  localStorage.setItem(`ufcdle_state${storageSuffix}`, JSON.stringify(gameState));
};

// Load current game state
export const loadGameState = (storageSuffix: string = '') => {
  const stateJson = localStorage.getItem(`ufcdle_state${storageSuffix}`);
  
  if (!stateJson) {
    return null;
  }
  
  return JSON.parse(stateJson);
};
