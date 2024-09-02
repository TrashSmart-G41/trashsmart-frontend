import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
//import { trucks } from './data/services'
import { Card } from '@/components/ui/card'

import { useEffect, useState } from 'react'
import { fetchGarbageTrucks } from './data/services'

export default function Tasks() {
  const [garbagetrucks, setGarbageTrucks] = useState([])

  useEffect(() => {
    const loadGarbageTrucks = async () => {
      try {
        const data: any = await fetchGarbageTrucks()
        // console.log(data);
        const mappedData: any = data.map((garbagetruck: any) => ({
          truck_id: `GT-${garbagetruck.id.toString().padStart(3, '0')}`,
          licence_plate_number: garbagetruck.licencePlateNo,
          max_load_capacity: garbagetruck.maxVolume,
          status: garbagetruck.truckStatus,
          mileage: garbagetruck.mileage,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.truck_id.localeCompare(a.truck_id)
        )
        setGarbageTrucks(sortedData)
      } catch (error) {
        console.error('Failed to load garbage trucks:', error)
      }
    }

    loadGarbageTrucks()
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card className='mt-2 rounded-xl bg-card p-4'>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
                Trucks
              </h2>
            </div>
          </div>

          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={garbagetrucks} columns={columns} />
          </div>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
