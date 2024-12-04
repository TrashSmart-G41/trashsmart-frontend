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
import { useEffect, useState } from 'react'
// import GoogleMap from '@/components/custom/googlemap'
// import MapMarker from '@/components/custom/mapmarker'
import { fetchRequest } from '../data/services'
import { DeleteRequest } from './delete-popup'

export function RequestDialog({ contId }: { contId: string }) {
  const [request, setRequest] = useState<any | null>(null)

  useEffect(() => {
    const loadReq = async () => {
      try {
        const data: any = await fetchRequest(contId)
        console.log(data)

        if (!data) {
          throw new Error('Bin data is missing or invalid')
        }

        const mappedData = {
          id: `WCR-${data.createdTimeStamp.replace(/-/g, '').slice(2, 8)}-${data.id.toString().padStart(3, '0')}`,
          wasteType:
            data.wasteType.charAt(0).toUpperCase() +
            data.wasteType.slice(1).toLowerCase(),
          accumulatedVolume: `${data.accumulatedVolume}`,
          date: data.createdTimeStamp.slice(0, 10),
        }

        setRequest(mappedData)
      } catch (error) {
        console.error('Failed to load bin:', error)
      }
    }

    loadReq()
  }, [contId])

  if (!request) return <p>Loading bin information...</p>

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
          <DialogTitle>Waste Collection Request</DialogTitle>
          <DialogDescription>{request.id}</DialogDescription>
        </DialogHeader>
        <div className='gap-y-4'>
          {/* <Card className='p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Location
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  {request.location}
                </div>
              </div>
              <div className='flex items-center justify-center'>
              </div>
            </div>
            <GoogleMap width='100%' height={200} scrollable={false}>
              <MapMarker latitude={binData.longitude} longitude={binData.latitude} />
            </GoogleMap>
          </Card> */}

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Request Id
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  {request.id}
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
                <div className='text-sm font-medium text-destructive'>
                  {request.wasteType}
                </div>
              </div>
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Accumulated Volume
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  {request.accumulatedVolume} CMB
                </div>
              </div>
            </div>
          </Card>
        </div>
        <DialogFooter>
          <div className='flex justify-end pt-4'>
            <DeleteRequest contId={contId} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
