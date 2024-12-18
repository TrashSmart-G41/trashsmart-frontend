import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
//import { driver } from './data/driver'
import { Card } from '@/components/ui/card'

import { useEffect, useState } from 'react'
import { fetchDrivers } from './data/services'

export default function Tasks() {
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data: any = await fetchDrivers()
        // console.log(data);
        const mappedData: any = data.map((driver: any) => ({
          id: `EMP-${driver.id.toString().padStart(3, '0')}`,
          fullName: `${driver.firstName || ''} ${driver.lastName || ''}`.trim(),
          contactNo: driver.contactNo,
          status: driver.status,
        }))
        const sortedData = mappedData.sort((a: any, b: any) =>
          b.id.localeCompare(a.id)
        )
        setDrivers(sortedData)
      } catch (error) {
        console.error('Failed to load drivers:', error)
      }
    }

    loadDrivers()
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
                Drivers
              </h2>
            </div>
          </div>

          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={drivers} columns={columns} />
          </div>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
