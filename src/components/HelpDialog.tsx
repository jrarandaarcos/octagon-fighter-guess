
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>How to Play UFCdle</DialogTitle>
          <DialogDescription>
            Guess the UFC fighter in 6 tries. A new fighter available each day!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-1">Game Rules:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Each guess must be a valid UFC fighter from our database</li>
              <li>After each guess, you'll get feedback on how close you are</li>
              <li>You have 6 attempts to guess the correct fighter</li>
              <li>A new fighter is available each day at midnight</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Feedback Colors:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded"></div>
                <span>Green: Correct attribute</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                <span>Yellow: Close attribute (similar value)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-500 rounded"></div>
                <span>Red: Incorrect attribute</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Attributes:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Name: The fighter's full name</li>
              <li>Country: Fighter's nationality</li>
              <li>Division: Fighter's weight class</li>
              <li>Debut Year: Year of UFC debut</li>
              <li>Debut Event: First UFC event</li>
              <li>Record: Win-Loss-Draw record</li>
              <li>Fighting Style: Primary fighting background</li>
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground">
            A hint will be provided after 3 failed attempts to help you narrow down your search.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
