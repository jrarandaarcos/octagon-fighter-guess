
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PastFighter {
  date: string;
  name: string;
  wasGuessed: boolean;
}

const PastFighters: React.FC = () => {
  const [pastFighters, setPastFighters] = useState<PastFighter[]>([]);

  // Load past fighters from localStorage
  useEffect(() => {
    const pastFightersJson = localStorage.getItem('ufcdle_past_fighters');
    if (pastFightersJson) {
      try {
        setPastFighters(JSON.parse(pastFightersJson));
      } catch (e) {
        setPastFighters([]);
      }
    }
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ChevronLeft size={24} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Past Fighters</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {pastFighters.length > 0 ? (
          <div className="bg-card rounded-lg shadow border">
            <div className="grid grid-cols-[1fr,2fr,auto] px-4 py-3 border-b font-medium text-sm">
              <div>Date</div>
              <div>Fighter</div>
              <div>Result</div>
            </div>
            <div className="divide-y">
              {pastFighters.map((fighter, index) => (
                <div 
                  key={index} 
                  className="px-4 py-3 grid grid-cols-[1fr,2fr,auto] gap-2 items-center"
                >
                  <div className="text-sm text-muted-foreground">
                    {formatDate(fighter.date)}
                  </div>
                  <div className="font-medium">{fighter.name}</div>
                  <div>
                    {fighter.wasGuessed ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Guessed
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Missed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="octagon bg-muted w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">?</span>
            </div>
            <h2 className="text-xl font-bold mb-2">No Past Fighters Yet</h2>
            <p className="text-muted-foreground">
              Play more days to build your fighter history!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PastFighters;
