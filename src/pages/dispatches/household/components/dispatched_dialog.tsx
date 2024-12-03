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
import {
  fetchDispatch,
  deleteDispatch,
} from '@/pages/dispatches/household/data/services'
import { useEffect, useState } from 'react'

export function DispatchesDialog({ contId }: { contId: string }) {
  const [dispatchData, setDispatchData] = useState<any | null>(null)

  useEffect(() => {
    const loadDispatch = async () => {
      try {
        const data: any = await fetchDispatch(contId)
        console.log(data)

        if (!data) {
          throw new Error('Data is missing or invalid')
        }

        const dateTime = new Date(data.dateTime)
        const date = dateTime.toISOString().split('T')[0]
        const time = dateTime.toTimeString().split(' ')[0]

        const mappedData = {
          dispatch_id: `SB-${data.id.toString().padStart(3, '0')}`,
          date: date,
          time: time,
        }

        setDispatchData(mappedData)
      } catch (error) {
        console.error('Failed to load:', error)
      }
    }

    loadDispatch()
  }, [contId])

  const handleDelete = async () => {
    try {
      const confirmation = confirm(
        'Are you sure you want to delete this request?'
      )
      if (!confirmation) return

      await deleteDispatch(contId)
      alert('Reqeust deleted successfully')
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete request:', error)
      alert('Failed to delete the request. Please try again.')
    }
  }

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
        {dispatchData ? (
          <>
            <DialogHeader className='flex flex-col items-center justify-center'>
              <DialogTitle>{dispatchData.dispatch_id}</DialogTitle>
            </DialogHeader>
            <div className='gap-y-4'>
              <Card className='p-4'>
                <div className='grid grid-cols-3'>
                  <div className='col-span-2 grid'>
                    <div className='text-[12px] text-muted-foreground'>
                      Location
                    </div>
                    <div className='text-sm font-medium text-muted-foreground'>
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
                    <div className='text-[12px] text-muted-foreground'>
                      Date
                    </div>
                    <div className='text-sm font-medium text-muted-foreground'>
                      {dispatchData.date}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className='my-2 p-4'>
                <div className='grid grid-cols-3'>
                  <div className='col-span-2 grid'>
                    <div className='text-[12px] text-muted-foreground'>
                      Time
                    </div>
                    <div className='text-sm font-medium text-destructive'>
                      {dispatchData.time}
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
                    <div className='text-sm font-medium text-muted-foreground'>
                      TRK003
                    </div>
                  </div>
                </div>
              </Card>

              <Card className='p-4'>
                <div className='grid grid-cols-3'>
                  <div className='col-span-2 grid'>
                    <div className='text-[12px] text-muted-foreground'>
                      Driver ID
                    </div>
                    <div className='text-sm font-medium text-muted-foreground'>
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
              <Button variant='destructive' onClick={handleDelete}>
                Delete Dispatch
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className='text-center text-muted-foreground'>Loading...</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
