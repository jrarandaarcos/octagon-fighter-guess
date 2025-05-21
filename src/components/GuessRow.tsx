
import React from 'react';
import { Fighter } from '../data/fighters';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface GuessRowProps {
  fighter?: Fighter;
  result?: {[key: string]: "correct" | "close" | "incorrect"};
  targetYear?: number;
  showHeaders?: boolean;
}

const GuessRow: React.FC<GuessRowProps> = ({ fighter, result, targetYear, showHeaders = false }) => {
  // Map of attributes to show - removed debutEvent
  const attributesToShow = [
    { key: 'name', label: 'Name', value: fighter?.name || '' },
    { key: 'country', label: 'Country', value: fighter?.country || '' },
    { key: 'division', label: 'Division', value: fighter?.division || '' },
    { key: 'debutYear', label: 'Debut Year', value: fighter?.debutYear || '' },
  ];

  // If we need to display headers only
  if (showHeaders) {
    return (
      <div className="grid grid-cols-4 gap-2 w-full mb-2">
        {attributesToShow.map(({ key, label }) => (
          <div 
            key={`header-${key}`}
            className="font-bold text-center text-xs xs:text-sm md:text-base"
          >
            {label}
          </div>
        ))}
      </div>
    );
  }
  
  // If no fighter, render empty row
  if (!fighter || !result) {
    return (
      <div className="grid grid-cols-4 gap-2 w-full">
        {['name', 'country', 'division', 'debutYear'].map((attr) => (
          <div 
            key={attr}
            className="cell-empty h-12 border rounded flex items-center justify-center"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      <TooltipProvider>
        {attributesToShow.map(({ key, value }) => {
          const cellResult = result[key] || 'incorrect';
          const cellClasses = {
            'correct': 'cell-correct',
            'close': 'cell-close',
            'incorrect': 'cell-incorrect',
          };
          
          // Show year indicator for debut year when it's not correct and target year is available
          const showYearIndicator = key === 'debutYear' && cellResult !== 'correct' && targetYear !== undefined;
          
          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-12 border rounded flex items-center justify-center p-2 text-center transition-colors duration-300",
                    cellClasses[cellResult]
                  )}
                >
                  <div className="flex items-center justify-center gap-1 w-full">
                    <span className={cn(
                      "text-xs xs:text-sm sm:text-base md:text-lg", 
                      showYearIndicator ? "mr-1" : "px-1"
                    )}>
                      {value}
                    </span>
                    {showYearIndicator && (
                      <>
                        {Number(value) < targetYear ? (
                          <ArrowUp className="text-white stroke-[3] w-5 h-5 flex-shrink-0" />
                        ) : (
                          <ArrowDown className="text-white stroke-[3] w-5 h-5 flex-shrink-0" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {String(value)}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default GuessRow;
