import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { fetchRecyclingPlants } from './data/services'
import LocationPicker from '@/components/custom/location_picker'

export default function Tasks() {
  const [ recyclingPlants, setRecyclingPlants ] = useState([])

  useEffect(() => {
    const loadRecyclingPlants = async () => {
      try {
        const data: any = await fetchRecyclingPlants()
        const mappedData = data.map((plant: any) => ({
          id: `PLANT-${plant.id.toString().padStart(3, '0')}`,
          firstName: plant.firstName,
          brn: plant.brn,
          address: plant.address,
          contactNo: plant.contactNo,
        }))
        // setOrganizations(mappedData)
        const sortedData = mappedData.sort((a: any, b: any) =>
          b.id.localeCompare(a.id)
        )
        setRecyclingPlants(sortedData)
      } catch (error) {
        console.error('Failed to load Recycling Plants:', error)
      }
    }

    loadRecyclingPlants()
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
        <div className='grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                <div className='flex flex-row items-center'>
                  <svg
                    className='mr-1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M6.25 12a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zM5.5 9.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75M6.25 5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zM9 12.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75m.75-4.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zM9 5.75A.75.75 0 0 1 9.75 5h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 9 5.75M13.25 12a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm-.75-2.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75M13.25 5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5z'
                    />
                    <path
                      fill='currentColor'
                      d='M2 20V3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v17q0 .26-.063.5H20a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.2-.4l-.5-.375a.75.75 0 0 1 .9-1.2l.5.375c.504.378.8.97.8 1.6v8a2 2 0 0 1-2 2h-3.562a1 1 0 0 1-.166-.018Q16.138 22 16 22h-3.75a.75.75 0 0 1-.75-.75V19h-3v2.25a.75.75 0 0 1-.75.75H4a2 2 0 0 1-2-2m2 .5h3v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25h3a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H4a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 .5.5'
                    />
                  </svg>
                  TOTAL COUNT
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  16
                </div>
                {/* <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  1.7%
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                NEW REGISTRATIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  06
                </div>
                <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  4.7%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-primary'>
                ACTIVE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-primary'>
                  14
                </div>
                {/* <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  1.7%
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                LIVE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  5
                </div>
                <div className='flex flex-row text-destructive'>
                  <TrendingDown className='pr-1' />
                  0.2%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card> */}
        </div>

        <Card className='mt-4'>
          <div className='rounded-xl  bg-card p-4'>
            <div className='mb-2 flex items-center justify-between space-y-2 '>
              <div>
                <h2 className='text-2xl font-semibold text-muted-foreground '>
                  Recycling Plants
                </h2>
              </div>
            </div>

            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable data={recyclingPlants} columns={columns} />
            </div>
          </div>
        </Card>
        <LocationPicker/>
      </Layout.Body>
    </Layout>
  )
}
