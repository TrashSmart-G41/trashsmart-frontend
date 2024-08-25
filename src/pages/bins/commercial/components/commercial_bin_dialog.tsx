import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"

export function CommercialDialog() {
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
          <DialogTitle>SB-9A5D4B3E</DialogTitle>
          <DialogDescription>Mega - 50 Liters</DialogDescription>
        </DialogHeader>
        <div className='gap-y-4'>
          <Card className='p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Purchase Date
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  29-04-2024
                </div>
              </div>
              {/* <div className='flex items-center justify-center'>
                <Button
                  variant='ghost'
                  className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
                >
                  Change Location
                </Button>
              </div> */}
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Fill Level
                </div>
                <div className='text-sm font-medium text-destructive'>Full</div>
              </div>
              {/* <div className="flex justify-center items-center">
                                <Button variant="ghost" className="flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary">
                                    Change Location
                                </Button>
                            </div> */}
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Collection History
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  Last collection on 24-06-2024
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

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Maintenance History
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  Last maintenance on 14-05-2024
                </div>
              </div>
              {/* <div className="flex justify-center items-center">
                                <Button variant="ghost" className="flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary">
                                    Change Location
                                </Button>
                            </div> */}
            </div>
          </Card>
        </div>
        <DialogFooter>
          <Button variant='destructive'>Delete Bin</Button>
          <Button>+ Maintenance request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
