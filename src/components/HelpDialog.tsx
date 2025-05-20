
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            Guess the UFC fighter in 6 tries.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basics">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4">
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Each guess must be a valid UFC fighter</li>
              <li>You have 6 attempts to guess correctly</li>
              <li>A new fighter is available daily at midnight</li>
              <li>Color codes show how close your guess is:</li>
            </ul>
            
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>Correct</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Close</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span>Wrong</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div>
              <h3 className="font-bold mb-1">Debut Year Hints:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center px-2 py-1 bg-yellow-500 rounded">
                    <span className="text-black mr-1">2015</span>
                    <ArrowUp size={16} className="text-black stroke-[3]" />
                  </div>
                  <span>Too early - fighter debuted later</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center px-2 py-1 bg-yellow-500 rounded">
                    <span className="text-black mr-1">2015</span>
                    <ArrowDown size={16} className="text-black stroke-[3]" />
                  </div>
                  <span>Too late - fighter debuted earlier</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-1">Attributes Checked:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li><b>Name:</b> Fighter's full name</li>
                <li><b>Country:</b> Fighter's nationality</li>
                <li><b>Division:</b> Fighter's weight class</li>
                <li><b>Debut Year:</b> Year of UFC debut</li>
                <li><b>Debut Event:</b> First UFC event</li>
              </ul>
            </div>
            
            <p className="text-xs text-muted-foreground">
              After 3 failed attempts, a hint will be provided.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
