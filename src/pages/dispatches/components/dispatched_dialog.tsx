import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"

export function DispatchesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
        >
          View
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex flex-col items-center justify-center'>
          <DialogTitle>DR-20240624</DialogTitle>
          {/* <DialogDescription>Mega - 50 Liters</DialogDescription> */}
        </DialogHeader>
        <div className='gap-y-4'>
          <Card className='p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Location
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  Hyde Park, London, UK
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  variant='ghost'
                  className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
                >
                  Change Location
                </Button>
              </div>
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>Date</div>
                <div className='text-sm font-medium text-muted-foreground'>
                  29-04-2024
                </div>
              </div>
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>Time</div>
                <div className='text-sm font-medium text-destructive'>
                  06:00 A.M
                </div>
              </div>
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Truck ID
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  TRK003
                </div>
              </div>
              {/* <div className='flex items-center justify-center'>
                <Button
                  variant='scale_btn'
                  size='scale_btn'
                  className='h-8 bg-cyan-500/25 text-cyan-500'
                >
                  Request Sent
                </Button>
              </div> */}
            </div>
          </Card>

          <Card className='p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Driver ID
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  EMP10005
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  variant='ghost'
                  className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
                >
                  Change driver
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <DialogFooter>
          <Button variant='destructive'>Delete Dispatch</Button>
          {/* <Button>+ Maintenance request</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
