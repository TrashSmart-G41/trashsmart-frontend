import React, { useState } from 'react';
import { 
    Dialog,
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    // DialogDescription, 
    DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface BiddingPopupProps {
    auction: string;
    wasteType: string;
    minimumBidAmount: number;
    currentBid: number;
    onBid: (amount: number) => void;
}

const BiddingPopup: React.FC<BiddingPopupProps> = ({ auction, wasteType, minimumBidAmount, currentBid, onBid }) => {
  const [bidAmount, setBidAmount] = useState(Math.max(minimumBidAmount, currentBid));
  const [isOpen, setIsOpen] = useState(false);

  const handleBid = () => {
    if (bidAmount > currentBid) {
      onBid(bidAmount);
      setIsOpen(false);
    } else {
      toast({
        description: `Bid amount must be higher than the current bid of ${currentBid}`
    });
    }
  };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Math.max(Number(e.target.value), minimumBidAmount); // Ensure minimum value
//     setBidAmount(value - (value % 100)); // Round to nearest step of 100
//   };
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
            variant='ghost'
            className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
            onClick={() => setIsOpen(true)}
        >Place Bid</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
        </DialogHeader>
        <div className='gap-y-4'>
        <Card className='my-2 p-4'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2 grid'>
                        <div className='text-[12px] text-muted-foreground'>
                        Auction
                        </div>
                        <div className='text-sm font-medium text-muted-foreground '>
                        {auction}
                        </div>
                    </div>
                </div>
            </Card>
            <Card className='my-2 p-4'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2 grid'>
                        <div className='text-[12px] text-muted-foreground'>
                        Waste Type
                        </div>
                        <div className='text-sm font-medium text-muted-foreground '>
                        {wasteType}
                        </div>
                    </div>
                </div>
            </Card>
            {/* <Card className='my-2 p-4'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2 grid'>
                        <div className='text-[12px] text-muted-foreground'>
                        Minimum bid
                        </div>
                        <div className='text-sm font-medium text-muted-foreground '>
                        {minimumBidAmount}
                        </div>
                    </div>
                </div>
            </Card> */}
            <Card className='my-2 p-4'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2 grid'>
                        <div className='text-[12px] text-muted-foreground'>
                        Current bid
                        </div>
                        <div className='text-sm font-medium text-muted-foreground '>
                        {currentBid}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <div className='mt-4'>
          <Input
            type='number'
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            min={minimumBidAmount}
            step={100} 
            className='w-full'
          />
        </div>
        <DialogFooter>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button> 
          <Button variant='ghost' onClick={() => setBidAmount(Math.max(minimumBidAmount, currentBid))}>Reset</Button>
          <Button onClick={handleBid}>Submit Bid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BiddingPopup;