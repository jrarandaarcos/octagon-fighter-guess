
import React from 'react';
import { Fighter } from '../data/fighters';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface GuessRowProps {
  fighter?: Fighter;
  result?: {[key: string]: "correct" | "close" | "incorrect"};
}

const GuessRow: React.FC<GuessRowProps> = ({ fighter, result }) => {
  // If no fighter, render empty row
  if (!fighter || !result) {
    return (
      <div className="grid grid-cols-5 gap-2 w-full">
        {['name', 'country', 'division', 'debutYear', 'debutEvent'].map((attr) => (
          <div 
            key={attr}
            className="cell-empty h-12 border rounded flex items-center justify-center"
          />
        ))}
      </div>
    );
  }

  // Map of attributes to display (removed record and fightingStyle)
  const attributesToShow = [
    { key: 'name', label: 'Name', value: fighter.name },
    { key: 'country', label: 'Country', value: fighter.country },
    { key: 'division', label: 'Division', value: fighter.division },
    { key: 'debutYear', label: 'Debut Year', value: fighter.debutYear },
    { key: 'debutEvent', label: 'Debut Event', value: fighter.debutEvent },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 w-full">
      {attributesToShow.map(({ key, value }) => {
        const cellResult = result[key] || 'incorrect';
        const cellClasses = {
          'correct': 'cell-correct',
          'close': 'cell-close',
          'incorrect': 'cell-incorrect',
        };
        
        // Add arrow indicator for debut year when it's "close"
        const showYearIndicator = key === 'debutYear' && cellResult === 'close';
        
        return (
          <div
            key={key}
            className={cn(
              "h-12 border rounded flex items-center justify-center p-1 text-center text-xs md:text-sm transition-colors duration-300",
              cellClasses[cellResult]
            )}
            title={String(value)}
          >
            <div className="flex items-center justify-center gap-1">
              <span className="px-1">{value}</span>
              {showYearIndicator && (
                <span className="text-black dark:text-white">
                  {/* We would need the target fighter's year to determine if higher/lower */}
                  {/* For now this is just a visual, game logic would determine which arrow */}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuessRow;
