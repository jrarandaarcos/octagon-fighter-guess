
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { formatCombinedShareResult } from '../utils/gameUtils';
import { useToast } from '@/hooks/use-toast';

interface FinalShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinalShareDialog: React.FC<FinalShareDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { gameCompletionStatus, getAllGameStats } = useGameContext();
  const [copied, setCopied] = useState(false);
  
  // Get all stats
  const allStats = getAllGameStats();
  
  // Calculate total score for nickname game
  const nicknameScore = allStats.nickname.gamesWon;
  
  // Generate the share text
  const shareText = formatCombinedShareResult(
    gameCompletionStatus, 
    allStats.male, 
    allStats.female, 
    nicknameScore
  );
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share your combined results with friends",
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
          <DialogTitle>Share your combined results</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-center">
              Here's your daily UFC fighter guessing game results:
            </p>
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

export default FinalShareDialog;
