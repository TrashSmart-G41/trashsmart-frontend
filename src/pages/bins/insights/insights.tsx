// import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'
// import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
// import { binCount } from './data/services'
// import { FULLbinCount } from './data/services'
import { requestCount } from '@/pages/bins/maintenance/data/services.tsx'
import { useEffect, useState } from 'react'

const API_URL = 'api/v1/statistics'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { TopTen } from '../components/insights/top10'
import { AxiosResponse } from 'axios'
import { request } from '@/lib/axiosHelper'

const chartConfig1 = {
  Count: {
    label: 'Purchases',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const chartConfig2 = {
  Count: {
    label: 'Purchases',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function Insights() {
  // const [binCounts, setBinCount] = useState(0)
  // const [fullBinCount, setFullBinCount] = useState(0)
  const [reqCount, setReqCount] = useState(0)

  const [totalBins, setTotalBins] = useState<number>(0)
  const [totalFullBins, setTotalFullBins] = useState<number>(0)
  const [totalCollections, setTotalCollections] = useState<number>(0)
  const [topOrganizations, setTopOrganizations] = useState<any[]>([])
  const [newCommercialBins, setNewCommercialBins] = useState<number>(0)
  const [newCommunalBin, setNewCommunalBins] = useState<number>(0)
  const [chartData1, setChartData1] = useState<{ month: string; Count: number }[]>([])
  const [chartData2, setChartData2] = useState<{ month: string; Count: number }[]>([])

  useEffect(() => {
    const loadCount = async () => {
      try {
        // const data: any = await binCount()
        // const data2: any = await FULLbinCount()
        const data3: any = await requestCount()
        // setBinCount(data)
        // setFullBinCount(data2)
        setReqCount(data3)
      } catch (error) {
        console.error('Failed to load count:', error)
      }
    }
    loadCount()
  }, [])

  // Fetch total bin count
  useEffect(() => {
    const fetchTotalBins = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_bins`
        )
        setTotalBins(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }

    fetchTotalBins()
  }, [])

  // Fetch total full bin count
  useEffect(() => {
    const fetchTotalFullBins = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_full_bins`
        )
        setTotalFullBins(response.data) // Update the state with the API data
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }

    fetchTotalFullBins()
  }, [])

  // Fetch total collections
  useEffect(() => {
    const fetchTotalCollections = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_collections`
        )
        setTotalCollections(response.data)
      } catch (error) {
        console.error('Failed to load total collections:', error)
      }
    }

    fetchTotalCollections()
  }, [])

  // Fetch new commercial bin purchases count
  useEffect(() => {
    const fetchCommercialBinPurchaseCount = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_commercial_bin_purchase_count`
        )
        setNewCommercialBins(response.data)
      } catch (error) {
        console.error('Failed to load total collections:', error)
      }
    }

    fetchCommercialBinPurchaseCount()
  }, [])

  // Fetch new communal bin establishment count
  useEffect(() => {
    const fetchCommunalBinEstCount = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_communal_bin_est_count`
        )
        setNewCommunalBins(response.data)
      } catch (error) {
        console.error('Failed to load total collections:', error)
      }
    }

    fetchCommunalBinEstCount()
  }, [])

  // Fetch top 10 organizations
  useEffect(() => {
    const fetchTopOrganizations = async () => {
      try {
        const response: AxiosResponse<any[]> = await request('GET', `${API_URL}/top_ten_organizations`)
        setTopOrganizations(response.data)
      } catch (error) {
        console.error('Failed to load top organizations:', error)
      }
    }
    fetchTopOrganizations()
  }, [])

  // Fetch monthly commercial bin purchase count
  useEffect(() => {
    const fetchMonthlyCommercialPurchases = async () => {
      try {
        const response: AxiosResponse<{ month: string; count: number }[]> = await request(
          'GET',
          `${API_URL}/monthly_commercial_bins`
        )

        console.log("Monthly commercial bin purchases response:", response.data)

        const formatted = response.data.map((item) => ({
          month: item.month,
          Count: item.count,
        }))

        setChartData1(formatted)
      } catch (error) {
        console.error('Failed to load monthly total waste:', error)
      }
    }

    fetchMonthlyCommercialPurchases()
  }, [])

  // Fetch monthly commmunal bin purchase count
  useEffect(() => {
    const fetchMonthlyCommunalPurchases = async () => {
      try {
        const response: AxiosResponse<{ month: string; count: number }[]> = await request(
          'GET',
          `${API_URL}/monthly_communal_bins`
        )

        console.log("Monthly commercial bin purchases response:", response.data)

        const formatted = response.data.map((item) => ({
          month: item.month,
          Count: item.count,
        }))

        setChartData2(formatted)
      } catch (error) {
        console.error('Failed to load monthly total waste:', error)
      }
    }

    fetchMonthlyCommunalPurchases()
  }, [])

  return (
    <>
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
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                <CardTitle className='text-md font-medium text-primary'>
                  CURRENTLY FULL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-row items-center'>
                  <div className='pr-2 text-4xl font-semibold text-primary'>
                    {totalFullBins}
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
                <CardTitle className='text-md font-medium text-muted-foreground/70'>
                  TOTAL MAINTENANCES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-row items-center'>
                  <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                    {reqCount}
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
                  NEW COMMERCIAL BIN PURCHASES
                </CardTitle>
                <CardDescription>
                  <CardContent className='px-0'>
                    <div className='flex flex-row items-center'>
                      <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                        {newCommercialBins}
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
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                      dataKey="Count"
                      type="monotone"
                      stroke="hsl(var(--chart-1))"
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
                  NEW COMMUNAL BIN ESTABLISHMENTS
                </CardTitle>
                <CardDescription>
                  <CardContent className='px-0'>
                    <div className='flex flex-row items-center'>
                      <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                        {newCommunalBin}
                      </div>
                      <div className='flex flex-row items-center text-primary'>
                        <TrendingUp className='pr-1' />
                        2.4%
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
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                      dataKey="Count"
                      type="monotone"
                      stroke="hsl(var(--chart-1))"
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

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>TOP 10 ORGANIZATIONS</CardTitle>
          <CardDescription>Based on no.of bins occupied</CardDescription>
        </CardHeader>
        {/*<CardContent>*/}
        {/*  <TopTen />*/}
        {/*</CardContent>*/}
        <CardContent>
          <TopTen organizations={topOrganizations} />
        </CardContent>
      </Card>
    </>
  )
}
