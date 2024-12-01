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
import { useEffect, useState } from 'react'
import { fetchCommunalBin } from '../data/services.tsx'
import { deleteCommunalBin } from '../data/services.tsx'
import { addMaintenanceRequest } from '../../maintenance/data/services.tsx'
import GoogleMap from '@/components/custom/googlemap'
import MapMarker from '@/components/custom/mapmarker'

export function CommunalDialog({ binId }: { binId: string }) {
  console.log(binId)
  const [binData, setBinData] = useState<any | null>(null)

  useEffect(() => {
    const loadBin = async () => {
      try {
        const data: any = await fetchCommunalBin(binId)
        console.log(data)

        if (!data) {
          throw new Error('Bin data is missing or invalid')
        }

        const mappedData = {
          bin_id: `SB-${data.id.toString().padStart(3, '0')}`,
          location: `${data.longitude} , ${data.latitude}`,
          type: `${data.wasteType} - ${data.binSize}`,
          installed_date: data.installationDate,
          last_maintenance_date: data.lastMaintenanceDate,
          fill_level: data.fillLevel,
          last_collection_date: data.lastCollectionDate,
          longitude: data.longitude,
          latitude: data.latitude,
        }

        setBinData(mappedData)
      } catch (error) {
        console.error('Failed to load bin:', error)
      }
    }

    loadBin()
  }, [binId])

  const handleDelete = async () => {
    try {
      const confirmation = confirm('Are you sure you want to delete this bin?')
      if (!confirmation) return

      await deleteCommunalBin(binId)
      alert('Bin deleted successfully')
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete bin:', error)
      alert('Failed to delete the bin. Please try again.')
    }
  }

  const handleAdd = async () => {
    try {
      const requestData = {
        bin_id: binId,
        otherNotes: '',
      }

      await addMaintenanceRequest(requestData, binId)
      window.location.reload()
    } catch (error) {
      console.error('Failed to create request:', error)
      alert('Failed to create request. Please try again.')
    }
  }

  if (!binData) return <p>Loading bin information...</p>

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
          <DialogTitle>{binData.bin_id}</DialogTitle>
          <DialogDescription>{binData.type}</DialogDescription>
        </DialogHeader>
        <div className='gap-y-4'>
          <Card className='p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Location
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  {binData.location}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                {/* <Button
                  variant='ghost'
                  className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
                  onClick={handleEdit}
                >
                  Change Location
                </Button> */}
              </div>
            </div>
            <GoogleMap width='100%' height={200} scrollable={false}>
                  <MapMarker latitude={binData.longitude} longitude={binData.latitude} />
                  {/* <MapMarker latitude={6.912} longitude={79.852}  />
          <MapMarker latitude={6.922} longitude={79.842}  /> */}
                </GoogleMap>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Installation Date
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  {binData.installed_date}
                </div>
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
                  Fill Level
                </div>
                <div className='text-sm font-medium text-destructive'>
                  {binData.fill_level}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                {binData.fill_level > 75 && (
                  <Button
                    variant='scale_btn'
                    size='scale_btn'
                    className='h-8 bg-cyan-500/25 text-cyan-500'
                  >
                    Request Sent
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className='my-2 p-4'>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 grid'>
                <div className='text-[12px] text-muted-foreground'>
                  Maintenance History
                </div>
                <div className='text-sm font-medium text-muted-foreground '>
                  Last maintenance on {binData.last_maintenance_date}
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
          <Button variant='destructive' onClick={handleDelete}>
            Delete Bin
          </Button>
          <Button onClick={handleAdd}>+ Maintenance request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
