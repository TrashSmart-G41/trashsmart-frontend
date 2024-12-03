import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
//import { UserNav } from '@/components/user-nav'

import { useEffect, useState } from 'react'
import { fetchCommercialBins } from './data/services'

// const getLocationName = async (latitude, longitude) => {
//   const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
//   try {
//     const response = await axios.get(url)
//     const results = response.data.results
//     if (results && results.length > 0) {
//       return results[0].formatted_address
//     } else {
//       return 'Unknown Location'
//     }
//   } catch (error) {
//     console.error('Failed to fetch location:', error)
//     return 'Unknown Location'
//   }
// }

export default function CommercialBins() {
  const [commercialBins, setCommercialBins] = useState([])

  useEffect(() => {
    const loadCommercialBins = async () => {
      try {
        const data: any = await fetchCommercialBins()
        console.log(data)
        const mappedData: any = data.map((commercialbin: any) => ({
          bin_id: `SB-${commercialbin.id.toString().padStart(3, '0')}`,
          organization: commercialbin.organization ? commercialbin.organization.firstName : 'Not Assigned',
          location: `${commercialbin.longitude} , ${commercialbin.latitude}`,
          type: `${commercialbin.wasteType} - ${commercialbin.binSize}`,
          purchased_date: commercialbin.purchaseDate,
          fill_level: commercialbin.fillLevel,
          status: commercialbin.binStatus,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.bin_id.localeCompare(a.bin_id)
        )
        setCommercialBins(sortedData)
      } catch (error) {
        console.error('Failed to load commercial bins:', error)
      }
    }

    loadCommercialBins()
  }, [])

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Commercial Bins
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={commercialBins} columns={columns} />
      </div>
    </Card>
  )
}
