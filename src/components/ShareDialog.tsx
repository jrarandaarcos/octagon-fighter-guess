
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { formatShareResult } from '../utils/gameUtils';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { gameState, gameStats } = useGameContext();
  const { guesses, guessResults, isWin, maxAttempts, dailyFighter } = gameState;
  const [copied, setCopied] = useState(false);
  
  // Early return if dailyFighter is null
  if (!dailyFighter) {
    return null;
  }
  
  // Generate the share text
  const shareText = formatShareResult(
    guesses.length,
    maxAttempts,
    isWin,
    guessResults
  );
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with friends",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share your results</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            {isWin ? (
              <p className="text-center">
                Great job! You guessed <span className="font-bold">{dailyFighter.name}</span> in {guesses.length} {guesses.length === 1 ? 'attempt' : 'attempts'}.
              </p>
            ) : (
              <p className="text-center">
                Today's fighter was <span className="font-bold">{dailyFighter.name}</span>. Better luck tomorrow!
              </p>
            )}
          </div>
          
          <div className="bg-muted p-3 rounded font-mono whitespace-pre-wrap text-sm">
            {shareText}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={copyToClipboard}
              className="bg-ufc-red hover:bg-red-600"
            >
              {copied ? (
                <>
                  <Check size={16} className="mr-2" /> Copied
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-2" /> Copy to Clipboard
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
