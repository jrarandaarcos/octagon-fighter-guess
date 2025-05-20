
export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string;
  guessDistribution: {[key: string]: number};
}

export interface GameState {
  dailyFighter: any; // Using 'any' to match the existing code pattern
  guesses: any[];
  guessResults: Array<{[key: string]: "correct" | "close" | "incorrect"}>;
  isGameOver: boolean;
  isWin: boolean;
  maxAttempts: number;
  currentHint: string | null;
}

export interface GameCompletionStatus {
  male: boolean;
  female: boolean;
  nickname: boolean;
  lastUpdated: string;
}
