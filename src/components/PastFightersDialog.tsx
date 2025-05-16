
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PastFighter {
  date: string;
  name: string;
  wasGuessed: boolean;
}

interface PastFightersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PastFightersDialog: React.FC<PastFightersDialogProps> = ({ open, onOpenChange }) => {
  // Load past fighters from localStorage
  const loadPastFighters = (): PastFighter[] => {
    const pastFightersJson = localStorage.getItem('ufcdle_past_fighters');
    if (!pastFightersJson) return [];
    
    try {
      return JSON.parse(pastFightersJson);
    } catch (e) {
      return [];
    }
  };

  const [pastFighters] = useState<PastFighter[]>(loadPastFighters());

  // Format date for display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Past Fighters</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          {pastFighters.length > 0 ? (
            <div className="divide-y">
              {pastFighters.map((fighter, index) => (
                <div 
                  key={index} 
                  className="py-3 grid grid-cols-[1fr,2fr,auto] gap-2 items-center"
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
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No past fighters yet</p>
              <p className="text-sm mt-1">Play more days to build your history!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PastFightersDialog;
