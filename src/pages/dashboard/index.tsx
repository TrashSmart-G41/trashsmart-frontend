import { Layout } from '@/components/custom/layout'
// import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { NotifyNav } from '@/components/notifications-nav'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'
// import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { columns } from './org/columns'
//import { organizations } from './org/data/organizations'
import { fetchOrganizations } from '../organizations/data/services'
import { useEffect, useState } from 'react'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { DataTable } from './org/data-table'
import { AxiosResponse } from 'axios'
import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/statistics'

// import { InputForm } from '@/components/custom/form'
// import { PopupForm } from '@/components/custom/popupform'
const chartData = [
  { month: 'January', Organizations: 186, CommunalBins: 80 },
  { month: 'February', Organizations: 305, CommunalBins: 200 },
  { month: 'March', Organizations: 237, CommunalBins: 120 },
  { month: 'April', Organizations: 73, CommunalBins: 190 },
  { month: 'May', Organizations: 209, CommunalBins: 130 },
  { month: 'June', Organizations: 214, CommunalBins: 140 },
]
const chartConfig = {
  Organizations: {
    label: 'Organizations',
    color: 'hsl(var(--chart-1))',
  },
  CommunalBins: {
    label: 'Communal Bins',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const chartData2 = [
  { month: 'January', Volume: 186 },
  { month: 'February', Volume: 305 },
  { month: 'March', Volume: 237 },
  { month: 'April', Volume: 73 },
  { month: 'May', Volume: 209 },
  { month: 'June', Volume: 214 },
]
const chartConfig2 = {
  Volume: {
    label: 'Volume (MT)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalCollections, setTotalCollections] = useState<number>(0)
  const [totalLastWeek, setTotalLastWeek] = useState<number>(0)
  const [totalLastWeekRequests, setTotalLastWeekRequests] = useState<number>(0)
  const [totalAccumulatedWaste, setTotalAccumulatedWaste] = useState<number>(0)
  const [totalRecyclableWaste, setTotalRecyclableWaste] = useState<number>(0)
  const [organizations, setOrganizations] = useState([])

  // Fetch total users
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_users`
        )
        setTotalUsers(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }

    fetchTotalUsers()
  }, [])

  // Fetch total collections
  useEffect(() => {
    const fetchTotalCollections = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_collections`
        )
        setTotalCollections(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total collections:', error)
      }
    }

    fetchTotalCollections()
  }, [])

  // Fetch total last week waste
  useEffect(() => {
    const fetchTotalLastWeek = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/last_week_total_waste`
        )
        setTotalLastWeek(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total last week waste:', error)
      }
    }

    fetchTotalLastWeek()
  }, [])

  // Fetch total last week requests
  useEffect(() => {
    const fetchTotalLastWeekRequests = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/last_week_request_count`
        )
        setTotalLastWeekRequests(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total last week requests:', error)
      }
    }

    fetchTotalLastWeekRequests()
  }, [])

  // Fetch total waste
  useEffect(() => {
    const fetchTotalAccumulatedWaste = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_accumulated_waste`
        )
        setTotalAccumulatedWaste(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total accumulated waste:', error)
      }
    }

    fetchTotalAccumulatedWaste()
  }, [])

  // Fetch total recyclable waste
  useEffect(() => {
    const fetchTotalRecyclableWaste = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_accumulated_recyclable_waste`
        )
        setTotalRecyclableWaste(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total recyclable waste:', error)
      }
    }

    fetchTotalRecyclableWaste()
  }, [])

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const data: any = await fetchOrganizations()
        const mappedData = data.map((org: any) => ({
          id: `ORG-${org.id.toString().padStart(3, '0')}`,
          firstName: org.firstName,
          scale:
            org.scale.charAt(0).toUpperCase() +
            org.scale.slice(1).toLowerCase(),
          address: org.address,
          totalWaste: org.totalWaste.toString(),
        }))
        // setOrganizations(mappedData)
        const sortedData = mappedData.sort((a: any, b: any) =>
          b.id.localeCompare(a.id)
        )
        setOrganizations(sortedData)
      } catch (error) {
        console.error('Failed to load organizations:', error)
      }
    }

    loadOrganizations()
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-2'>
          <NotifyNav />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      {/* <Layout.Body className='bg-muted'> */}
      <Layout.Body>
        {/* <div className='mb-6 flex items-center justify-between space-y-1'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div> */}
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-b-1'
        >
          <TabsContent value='overview' className='space-b-1'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                  <CardTitle className='text-md font-medium text-muted-foreground/70'>
                    TOTAL USERS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row items-center'>
                    <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                      {totalUsers}
                    </div>
                    <div className='flex flex-row text-primary'>
                      <TrendingUp className='pr-1' />
                      1.7%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                  <CardTitle className='text-md font-medium text-muted-foreground/70'>
                    TOTAL COLLECTIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-4xl font-semibold text-muted-foreground'>
                    {totalCollections}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                  <CardTitle className='text-md font-medium text-primary'>
                    WEEKLY WASTE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row items-center'>
                    <div className='pr-2 text-4xl font-semibold text-primary'>
                      {totalLastWeek} CBM
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                  <CardTitle className='text-md font-medium text-muted-foreground/70'>
                    WEEKLY REQUESTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row items-center'>
                    <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                      {totalLastWeekRequests}
                    </div>
                    <div className='flex flex-row text-destructive'>
                      <TrendingDown className='pr-1' />
                      0.8%
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
            <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle className='text-md font-medium text-muted-foreground/70'>
                    ACCUMULATED WASTE
                  </CardTitle>
                  <CardDescription>
                    <CardContent className='px-0'>
                      <div className='flex flex-row items-center'>
                        <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                          {totalAccumulatedWaste} Cubic Meters
                        </div>
                        <div className='flex flex-row items-center text-primary'>
                          <TrendingUp className='pr-1' />
                          0.8%
                        </div>
                      </div>
                    </CardContent>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
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
                        content={<ChartTooltipContent />}
                      />
                      <Line
                        dataKey='Organizations'
                        type='monotone'
                        stroke='var(--color-Organizations)'
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey='CommunalBins'
                        type='monotone'
                        stroke='var(--color-CommunalBins)'
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
                {/* <CardFooter>
                  <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-2 leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                      </div>
                    </div>
                  </div>
                </CardFooter> */}
              </Card>

              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle className='text-md font-medium text-muted-foreground/70'>
                    TOTAL RECYCLED VOLUME
                  </CardTitle>
                  <CardDescription>
                    <CardContent className='px-0'>
                      <div className='flex flex-row items-center'>
                        <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                          {totalRecyclableWaste} Cubic Meters
                        </div>
                        <div className='flex flex-row items-center text-primary'>
                          <TrendingUp className='pr-1' />
                          0.8%
                        </div>
                      </div>
                    </CardContent>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig2}>
                    <LineChart
                      accessibilityLayer
                      data={chartData2}
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
                        dataKey='Volume'
                        type='linear'
                        stroke='var(--color-Volume)'
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
                {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter> */}
              </Card>
            </div>
            {/* <PopupForm  formContent={InputForm} /> */}
          </TabsContent>
        </Tabs>
        <Card className='mt-4 rounded-xl bg-card p-4'>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={organizations} columns={columns} />
          </div>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
