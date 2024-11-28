import React, { useState } from 'react';
import { 
    Dialog,
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';

interface BiddingPopupProps {
  minimumBidAmount: number;
  currentBid: number;
  onBid: (amount: number) => void;
}

const BiddingPopup: React.FC<BiddingPopupProps> = ({ minimumBidAmount, currentBid, onBid }) => {
  const [bidAmount, setBidAmount] = useState(Math.max(minimumBidAmount, currentBid));

  const handleBid = () => {
    if (bidAmount > currentBid) {
      onBid(bidAmount);
    } else {
      alert(`Bid amount must be higher than the current bid of $${currentBid}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Place Bid</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
          <DialogDescription>
            Enter your bid amount. Minimum bid is ${minimumBidAmount}. Current bid is ${currentBid}.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          <Input
            type='number'
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            min={minimumBidAmount}
            className='w-full'
          />
        </div>
        <DialogFooter>
          <Button variant='ghost' onClick={() => setBidAmount(Math.max(minimumBidAmount, currentBid))}>Cancel</Button>
          <Button onClick={handleBid}>Submit Bid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BiddingPopup;