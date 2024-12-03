import { useEffect, useState } from 'react'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fetchDispatch } from '../data/services'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"

export function DispatchesDialog({ dispId }: { dispId: string }) {
  // console.log(dispId)
  // console.log('DispatchesDialog')

  const [dispData, setdispData] = useState<any | null>(null)

  useEffect(() => {
    const loadDisp = async () => {
      try {
        const data: any = await fetchDispatch(dispId)
        // console.log(data)

        if (!data || !data.id) {
          throw new Error('Dispatch data is missing or invalid')
        }

        const mappedData = {
          disp_id: `SB-${data.id.toString().padStart(3, '0')}`,
          dateTime: data.dateTime, //2024-12-03T22:18:28.194426
          date: data.dateTime.split('T')[0],
          time: data.dateTime.split('T')[1].split('.')[0],
          dispatchStatus: data.dispatchStatus,
          dispatchType: data.dispatchType,
          wasteType: data.wasteType,
          createdDateTime: data.createdDateTime,
          wasteCollectionRequests: data.wasteCollectionRequestList.map(
            (request: any) => ({
              id: request.id,
              accumulatedVolume: request.accumulatedVolume,
              wasteType: request.wasteType,
              latitude: request.latitude,
              longitude: request.longitude,
              status: request.wasteCollectionRequestStatus,
              createdTimeStamp: request.createdTimeStamp,
            })
          ),
        }

        console.log(mappedData)

        setdispData(mappedData)
      } catch (error) {
        console.error('Failed to load dispatch:', error)
      }
    }

    loadDisp()
  }, [dispId])

  console.log(dispData)
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
          <DialogTitle>{dispData?.disp_id}</DialogTitle>
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
                  {dispData?.date}
                </div>
              </div>
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>Time</div>
                <div className='text-sm font-medium text-destructive'>
                  {dispData?.time}
                </div>
              </div>
            </div>
          </Card>

          {/* <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Truck ID
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  TRK003
                </div>
              </div>
            </div>
          </Card> */}

          {/* <Card className='p-4'>
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
          </Card> */}
        </div>
        {/* <DialogFooter> */}
        {/* <Button variant='destructive'>Delete Dispatch</Button> */}
        {/* <Button>+ Maintenance request</Button> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
