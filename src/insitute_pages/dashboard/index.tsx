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
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'
// import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { request } from '@/lib/axiosHelper'

const API_URL = 'api/v1/organization'
const org_id = localStorage.getItem("userId")

const chartConfig1 = {
  Volume: {
    label: 'Volume (MT)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const chartConfig2 = {
  Volume: {
    label: 'Volume (MT)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function Dashboard() {
  const [totalBins, setTotalBins] = useState<number>(0)
  const [totalCollections, setTotalCollections] = useState<number>(0)
  const [weeklyWate, setWeeklyWaste] = useState<number>(0)
  const [weeklyWCR, setWeeklyWCR] = useState<number>(0)
  const [totalAccumulatedWaste, setTotalAccumulatedWaste] = useState<number>(0)
  const [totalRecyclableWaste, setTotalRecyclableWaste] = useState<number>(0)
  const [chartData1, setChartData1] = useState<{ month: string; Volume: number }[]>([])
  const [chartData2, setChartData2] = useState<{ month: string; Volume: number }[]>([])

  // Fetch total bin count
  useEffect(() => {
    const fetchTotalBins = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_bins/${org_id}`
        )
        setTotalBins(response.data)
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }

    fetchTotalBins()
  }, [])

  // Fetch total collection count
  useEffect(() => {
    const fetchTotalCollections = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_collections/${org_id}`
        )
        setTotalCollections(response.data)
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }
    fetchTotalCollections()
  }, [])

  // Fetch total weekly waste volume
  useEffect(() => {
    const fetchWeeklyWaste = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/last_week_total_waste/${org_id}`
        )
        setWeeklyWaste(response.data)
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }
    fetchWeeklyWaste()
  }, [])

  // Fetch total weekly requests
  useEffect(() => {
    const fetchWeeklyWCR = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/last_week_request_count/${org_id}`
        )
        setWeeklyWCR(response.data)
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }
    fetchWeeklyWCR()
  }, [])

  // Fetch total waste
  useEffect(() => {
    const fetchTotalAccumulatedWaste = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_accumulated_waste/${org_id}`
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
          `${API_URL}/total_accumulated_recyclable_waste/${org_id}`
        )
        setTotalRecyclableWaste(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total recyclable waste:', error)
      }
    }

    fetchTotalRecyclableWaste()
  }, [])

  // Fetch monthly waste
  useEffect(() => {
    const fetchMonthlyTotalWaste = async () => {
      try {
        const response: AxiosResponse<{ month: string; volume: number }[]> = await request(
          'GET',
          `${API_URL}/monthly_waste/${org_id}`
        )

        const formatted = response.data.map((item) => ({
          month: item.month,
          Volume: item.volume,
        }))

        setChartData1(formatted)
      } catch (error) {
        console.error('Failed to load monthly total waste:', error)
      }
    }

    fetchMonthlyTotalWaste()
  }, [])

  // Fetch monthly recyclable waste
  useEffect(() => {
    const fetchMonthlyWaste = async () => {
      try {
        const response: AxiosResponse<{ month: string; volume: number }[]> = await request(
          'GET',
          `${API_URL}/monthly_recyclable_waste/${org_id}`
        )

        // Convert backend field `volume` → frontend expected `Volume`
        const formatted = response.data.map((item) => ({
          month: item.month,
          Volume: item.volume,
        }))

        setChartData2(formatted)
      } catch (error) {
        console.error('Failed to load monthly recyclable waste:', error)
      }
    }

    fetchMonthlyWaste()
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
                    TOTAL BINS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row items-center'>
                    <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                      {totalBins}
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
                      {weeklyWate} MT
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
                    WEEKLY REQUESTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row items-center'>
                    <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                      {weeklyWCR}
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
                  <ChartContainer config={chartConfig1}>
                    <LineChart
                      accessibilityLayer
                      data={chartData1}
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
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
