import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { fetchCleaners } from './data/services'

export default function Tasks() {
  const [cleaner, setCleaner] = useState([])

  useEffect(() => {
    const loadCleaner = async () => {
      try {
        const data: any = await fetchCleaners()
        const mappedData = data.map((cleaner: any) => ({
          id: `CLN-${cleaner.id.toString().padStart(3, '0')}`,
          full_name: `${cleaner.firstName} ${cleaner.lastName}`,
          contactNo: cleaner.contactNo,
          region: cleaner.address.split(' ').pop(),
          status: cleaner.status,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.id.localeCompare(a.id)
        )

        setCleaner(sortedData)
      } catch (err) {
        console.error(err)
      }
    }

    loadCleaner()
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
                Cleaning Personnel
              </h2>
            </div>
          </div>

          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={cleaner} columns={columns} />
          </div>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
