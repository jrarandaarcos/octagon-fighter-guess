
import { Fighter } from "../data/fighters";

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
  
  let shareText = `UFCdle ${generateDateSeed()} ${won ? attempts : "X"}/${maxAttempts}\n\n`;
  
  guessResults.forEach((result) => {
    const resultEmojis = Object.values(result).map((r) => emojis[r]).join("");
    shareText += `${resultEmojis}\n`;
  });
  
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
  guessDistribution: {[key: string]: number}
): void => {
  const stats = {
    gamesPlayed,
    gamesWon,
    currentStreak,
    maxStreak,
    lastPlayedDate,
    guessDistribution,
  };
  
  localStorage.setItem("ufcdle_stats", JSON.stringify(stats));
};

// Load game stats from localStorage
export const loadGameStats = () => {
  const statsJson = localStorage.getItem("ufcdle_stats");
  
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
  guessResults: Array<{[key: string]: "correct" | "close" | "incorrect"}>
): void => {
  const gameState = {
    dailyFighter,
    guesses,
    guessResults,
  };
  
  localStorage.setItem("ufcdle_state", JSON.stringify(gameState));
};

// Load current game state
export const loadGameState = () => {
  const stateJson = localStorage.getItem("ufcdle_state");
  
  if (!stateJson) {
    return null;
  }
  
  return JSON.parse(stateJson);
};
