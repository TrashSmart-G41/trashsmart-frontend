import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { cleaners } from './data/cleaners'
// import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'
//import { useParams } from 'react-router-dom'
import { fetchDriver } from './data/services'

import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'
import { Button } from '../../components/custom/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', collections: 2 },
  { month: 'February', collections: 5 },
  { month: 'March', collections: 7 },
  { month: 'April', collections: 5 },
  { month: 'May', collections: 8 },
  { month: 'June', collections: 1 },
  { month: 'July', collections: 3 },
  { month: 'August', collections: 4 },
  { month: 'September', collections: 6 },
  { month: 'October', collections: 2 },
  { month: 'November', collections: 9 },
  { month: 'December', collections: 5 },
]
const chartConfig = {
  collections: {
    label: 'Collections',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function Driver() {
  const url = window.location.href
  const driverId = url.split('/').pop()?.slice(-3) as string
  //const driverId = useParams<{ driverId: string }>()
  const [driver, setDriver] = useState<any | null>(null)
  
  //console.log('Raw driverId from URL:', driverId)

  useEffect(() => {
    const loadDriver = async () => {
      try {
        const data: any = await fetchDriver(driverId)

        if (!data) {
          throw new Error('Driver data is missing or invalid')
        }

        const mappedData = {
          id: `00${data.id}`,
          fullName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          contactNo: data.contactNo,
          status: data.status,
          email: data.email,
          address: data.address,
          dob: data.dob,
          nic: data.nic,
          totalCollections: data.totalCollections,
          currentStreak: data.currentStreak,
          longestStreak: data.longestStreak,
          totalActiveDays: data.totalActiveDays,
          numberOfHolidays: data.numberOfHolidays,
        }

        setDriver(mappedData)
      } catch (error) {
        console.error('Failed to load driver:', error)
      }
    }

loadDriver()
  }, [driverId])
  if (!driver) return <p>Loading driver information...</p>;

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
        <Card className='relative mt-2'>
          <Button
            variant='outline'
            size='sm'
            className='hidde n absolute right-2 top-2 ml-auto h-8 lg:flex'
          >
            {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
            <svg
              className='mr-2 h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06'
              />
            </svg>
            Edit
          </Button>

          <div className='px-4 pt-4'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/drivers'>Drivers</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{driver.fullName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
            <div className='col-span-1 p-4 pb-0 pt-0 lg:col-span-3 '>
              <CardHeader className='p-0'>
                <div className='flex flex-row items-center justify-start'>
                  <CardTitle className='text-2xl font-bold'>
                    {driver.fullName}
                  </CardTitle>
                  <Button
                    variant='scale_btn'
                    size='scale_btn_sm'
                    className={`ml-2  bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]`}
                  >
                    <svg
                      className='mr-2 inline-block'
                      xmlns='http://www.w3.org/2000/svg'
                      width='6'
                      height='6'
                      viewBox='0 0 24 24'
                    >
                      <circle cx='12' cy='12' r='12' fill='currentColor' />
                    </svg>
                    {driver.status}
                  </Button>
                </div>
                <CardDescription>{driver.address}</CardDescription>
              </CardHeader>
            </div>
          </div>

          <Separator className=' my-2' />

          <div className='m-4 my-8 grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <div className='flex max-w-fit items-center justify-center'>
              <Avatar className='h-28 w-28 rounded-sm'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='lg:col-span-2'>
              <div>
                <CardDescription className='text-[13px]'>
                  Employee ID
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  EMP-{driver.id}
                </div>
              </div>
              <div className='mt-3'>
                <CardDescription className='text-[13px]'>
                  Full Name
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {driver.fullName}
                </div>
              </div>
            </div>

            <div className='lg:col-span-2'>
              <div>
                <CardDescription className='text-[13px]'>
                  Contact Number
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {driver.contactNo}
                </div>
              </div>
              <div className='mt-3'>
                <CardDescription className='text-[13px]'>
                  Address
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {driver.address}
                </div>
              </div>
            </div>

            <div className='lg:col-span-2'>
              <div>
                <CardDescription className='text-[13px]'>
                  Date of Birth
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {driver.dob}
                </div>
              </div>
              <div className='mt-3'>
                <CardDescription className='text-[13px]'>NIC</CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {driver.nic}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
          <Card className='col-span-1 p-4 lg:col-span-2'>
            <div>
              <div className='font-normal text-muted-foreground'>
                Total Collections{' '}
              </div>
              <div className='flex items-center text-[25px] font-semibold text-muted-foreground'>
                {driver.totalCollections}
                <TrendingUp className='mx-2 h-4 w-4 text-primary' />{' '}
                <span className='text-[13px] font-normal text-primary'>
                  1.7%
                </span>
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                Current Streak
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {driver.currentStreak}
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                Longest Streak
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {driver.longestStreak}
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                Total Working Days
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {driver.totalActiveDays}
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                No. of Leaves
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {driver.numberOfHolidays}
              </div>
            </div>
          </Card>

          <Card className='col-span-1 p-4 lg:col-span-4'>
            <div className='text-xl font-semibold text-muted-foreground'>
              Collection Analysis
            </div>
            <CardDescription className='text-[11px]'>
              01-01-2022 to 31-12-2022
            </CardDescription>
            <ChartContainer config={chartConfig} className='h-[340px] w-full'>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey='collections'
                  type='natural'
                  stroke='var(--color-collections)'
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
