import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
//import { UserNav } from '@/components/user-nav'

import { useEffect, useState } from 'react'
import { fetchCommercialBinByOrg } from './data/services'
import { jwtDecode, JwtPayload } from 'jwt-decode'

const token = localStorage.getItem('token') ?? ''
const decodeToken = jwtDecode<JwtPayload>(token) as { userId: string }
const contId = decodeToken?.userId
console.log(contId)

export default function CommercialBins() {
  const [commercialBins, setCommercialBins] = useState([])

  useEffect(() => {
    const loadCommercialBins = async () => {
      try {
        const data: any = await fetchCommercialBinByOrg(contId)
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
            Owned Bins
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={commercialBins} columns={columns} />
      </div>
    </Card>
  )
}
