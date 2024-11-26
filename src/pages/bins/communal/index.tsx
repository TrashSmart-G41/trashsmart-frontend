import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { communalBins } from './data/communalBins'
import { Card } from '@/components/ui/card'
import { fetchCommunalBins } from './data/services'
import { useEffect, useState } from 'react'

export default function CommunalBins() {
  const [communalBins, setCommunalBins] = useState([])

  useEffect(() => {
    const loadCommunalBins = async () => {
      try {
        const data: any = await fetchCommunalBins()
        console.log(data)
        const mappedData: any = data.map((communalbin: any) => ({
          //   const locationName = await getLocationName(
          //   commercialbin.latitude,
          //   commercialbin.longitude
          // ),

          bin_id: `SB-${communalbin.id.toString().padStart(3, '0')}`,
          location: `${communalbin.longitude} , ${communalbin.latitude}`,
          type: `${communalbin.wasteType} - ${communalbin.binSize}`,
          installed_date: communalbin.installationDate,
          fill_level: communalbin.fillLevel,
          status: communalbin.binStatus,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.bin_id.localeCompare(a.bin_id)
        )
        setCommunalBins(sortedData)
      } catch (error) {
        console.error('Failed to load commercial bins:', error)
      }
    }

    loadCommunalBins()
  }, [])

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Communal Smart Bins
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={communalBins} columns={columns} />
      </div>
    </Card>
  )
}
