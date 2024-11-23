import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { cleaners } from './data/cleaners'
// import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
import { useEffect, useState } from 'react'
import { fetchCleaner } from './data/services'
// import { date } from 'zod'
// import { clear } from 'console'
// import { EditCleaner } from './components/edit-cleaner-form'
import { EditSingleCleaner } from './components/edit-single-cleaner'
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

export default function Cleaner() {

  const [cleaner, setCleaner] = useState({
    id: '',
    full_name: '',
    contactNo: '',
    address: '',
    date_of_birth: '',
    nic: '',
    status: '',
    total_collections: 0,
    current_streak: 0,
    longest_streak: 0,
    total_working_days: 0,
    no_of_holidays: 0,
    last_collection_date: '',
    communal_bins: [],
  });  

  const url = window.location.href;
  const contId = url.split('/').pop()?.slice(-3);
  // console.log(contId)

  useEffect(() => {
    const loadCleaner = async () => {
      try {
        const data: any = await fetchCleaner(contId)
        console.log(data)
        const mappedData = {
          id: `CLN-${data.id.toString().padStart(3, '0')}`,
          full_name: `${data.firstName} ${data.lastName}`,
          contactNo: data.contactNo,
          address: data.address,
          date_of_birth: data.dob,
          nic: data.nic,
          status: data.status,
          total_collections: data.totalCollections,
          current_streak: data.currentStreak,
          longest_streak: data.longestStreak,
          total_working_days: data.totalActiveDays,
          no_of_holidays: data.numberOfHolidays,
          last_collection_date: data.lastCollectionDate,
          communal_bins: data.communalBins
        }

        setCleaner(mappedData);
        console.log(cleaner)
      } catch (err) {
        console.error(err)
      }
    }

    loadCleaner()
  }, [])

  const getDateRange = () => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setMonth(currentDate.getMonth() - 12);
  
    const formatDate = (date: Date) =>
      date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
    const startDate = formatDate(pastDate);
    const endDate = formatDate(currentDate);
  
    return `${startDate} to ${endDate}`;
  };

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  // const closeEditModal = () => {
  //   setIsEditOpen(false);
  // };


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
            onClick={handleEditClick}
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

          {isEditOpen && <EditSingleCleaner contId={contId} /> }

          <div className='px-4 pt-4'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/cleaners'>Cleaners</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{cleaner?.full_name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
            <div className='col-span-1 p-4 pb-0 pt-0 lg:col-span-3 '>
              <CardHeader className='p-0'>
                <div className='flex flex-row items-center justify-start'>
                  <CardTitle className='text-2xl font-bold'>
                    {cleaner?.full_name}
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
                    {cleaner?.status}
                  </Button>
                </div>
                <CardDescription>
                  {cleaner?.address}
                </CardDescription>
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
                  {cleaner.id}
                </div>
              </div>
              <div className='mt-3'>
                <CardDescription className='text-[13px]'>
                  Full Name
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {cleaner?.full_name}
                </div>
              </div>
            </div>

            <div className='lg:col-span-2'>
              <div>
                <CardDescription className='text-[13px]'>
                  Contact Number
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {cleaner?.contactNo}
                </div>
              </div>
              <div className='mt-3'>
                <CardDescription className='text-[13px]'>
                  Address
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {cleaner.address}
                </div>
              </div>
            </div>

            <div className='lg:col-span-2'>
              <div>
                <CardDescription className='text-[13px]'>
                  Date of Birth
                </CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {cleaner?.date_of_birth}
                </div>
              </div>
              <div className='mt-3'>
                <CardDescription className='text-[13px]'>NIC</CardDescription>
                <div className='font-medium text-muted-foreground'>
                  {cleaner?.nic}
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
                {cleaner?.total_collections} <TrendingUp className='mx-2 h-4 w-4 text-primary' />{' '}
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
                {cleaner.current_streak}
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                Longest Streak
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {cleaner.longest_streak}
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                Total Working Days
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {cleaner.total_working_days}
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-normal text-muted-foreground'>
                No. of Leaves
              </div>
              <div className='text-[25px] font-semibold text-muted-foreground'>
                {cleaner.no_of_holidays}
              </div>
            </div>
          </Card>

          <Card className='col-span-1 p-4 lg:col-span-4'>
            <div className='text-xl font-semibold text-muted-foreground'>
              Collection Analysis
            </div>
            <CardDescription className='text-[11px]'>
              {getDateRange()}
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
