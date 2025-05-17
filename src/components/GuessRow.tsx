
import React from 'react';
import { Fighter } from '../data/fighters';
import { cn } from '@/lib/utils';

interface GuessRowProps {
  fighter?: Fighter;
  result?: {[key: string]: "correct" | "close" | "incorrect"};
}

const GuessRow: React.FC<GuessRowProps> = ({ fighter, result }) => {
  // If no fighter, render empty row
  if (!fighter || !result) {
    return (
      <div className="grid grid-cols-7 gap-2 w-full">
        {['name', 'country', 'division', 'debutYear', 'debutEvent', 'record', 'fightingStyle'].map((attr) => (
          <div 
            key={attr}
            className="cell-empty h-12 border rounded flex items-center justify-center"
          />
        ))}
      </div>
    );
  }

  // Map of attributes to display
  const attributesToShow = [
    { key: 'name', label: 'Name', value: fighter.name },
    { key: 'country', label: 'Country', value: fighter.country },
    { key: 'division', label: 'Division', value: fighter.division },
    { key: 'debutYear', label: 'Debut Year', value: fighter.debutYear },
    { key: 'debutEvent', label: 'Debut Event', value: fighter.debutEvent },
    { key: 'record', label: 'Record', value: fighter.record },
    { key: 'fightingStyle', label: 'Style', value: fighter.fightingStyle },
  ];

  return (
    <div className="grid grid-cols-7 gap-2 w-full">
      {attributesToShow.map(({ key, value }) => {
        const cellResult = result[key] || 'incorrect';
        const cellClasses = {
          'correct': 'cell-correct',
          'close': 'cell-close',
          'incorrect': 'cell-incorrect',
        };
        
        return (
          <div
            key={key}
            className={cn(
              "h-12 border rounded flex items-center justify-center p-1 text-center text-xs md:text-sm transition-colors duration-300",
              cellClasses[cellResult]
            )}
            title={String(value)}
          >
            <span className="px-1">{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GuessRow;
