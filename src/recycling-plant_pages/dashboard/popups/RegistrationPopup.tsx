import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

interface RegistrationPopupProps {
  auction: string
  wasteType: string
  min_bid: string
  curr_bid: string
  onRegister: () => Promise<void> // Function to handle registration
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({
  auction,
  wasteType,
  min_bid,
  curr_bid,
  onRegister,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async () => {
    setIsSubmitting(true)
    try {
      await onRegister()
      toast({ description: `Successfully registered for auction: ${auction}` })
      setIsOpen(false)
    } catch (error: any) {
      toast({ description: `Failed to register: ${error.message}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
          onClick={() => setIsOpen(true)}
        >
          Register
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for Auction</DialogTitle>
        </DialogHeader>
        <div className='gap-y-4'>
          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>Auction</div>
                <div className='text-sm font-medium text-muted-foreground'>
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
                <div className='text-sm font-medium text-muted-foreground'>
                  {wasteType}
                </div>
              </div>
            </div>
          </Card>
          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Minimum Bid
                </div>
                <div className='text-sm font-medium text-muted-foreground'>
                  {min_bid}
                </div>
              </div>
            </div>
          </Card>
          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Current Bid
                </div>
                <div className='text-sm font-medium text-muted-foreground'>
                  {curr_bid}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <DialogFooter>
          <Button variant='ghost' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            disabled={isSubmitting}
            className={`ml-2 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Registering...' : 'Confirm Registration'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RegistrationPopup
