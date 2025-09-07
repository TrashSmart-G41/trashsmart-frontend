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
// import { TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { request } from '@/lib/axiosHelper'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
// import { TopTen } from '../components/insights/top10'

const chartConfig1 = {
  Count: {
    label: 'Purchases',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

// const chartData2 = [
//   { month: 'January', desktop: 186 },
//   { month: 'February', desktop: 305 },
//   { month: 'March', desktop: 237 },
//   { month: 'April', desktop: 73 },
//   { month: 'May', desktop: 209 },
//   { month: 'June', desktop: 214 },
// ]
// const chartConfig2 = {
//   desktop: {
//     label: 'Establishments',
//     color: 'hsl(var(--chart-1))',
//   },
// } satisfies ChartConfig

const API_URL = 'api/v1/organization'
const org_id = localStorage.getItem("userId")

export default function Insights() {
  const [totalBins, setTotalBins] = useState<number>(0)
  const [fullBinCount, setFullBinCount] = useState(0)
  const [totalCollections, setTotalCollections] = useState<number>(0)
  const [totalMaintenances, setTotalMaintenances] = useState<number>(0)
  const [newCommercialBins, setNewCommercialBins] = useState<number>(0)
  const [chartData1, setChartData1] = useState<{ month: string; Count: number }[]>([])

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

  // Fetch total bin count
  useEffect(() => {
    const fetchTotalFullBins = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_full_bins/${org_id}`
        )
        setFullBinCount(response.data)
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }
    fetchTotalFullBins()
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

  // Fetch total maintenance count
  useEffect(() => {
    const fetchTotalMaintenances = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_maintenances/${org_id}`
        )
        setTotalMaintenances(response.data)
      } catch (error) {
        console.error('Failed to load total users:', error)
      }
    }
    fetchTotalMaintenances()
  }, [])

  // Fetch new commercial bin purchases count
  useEffect(() => {
    const fetchCommercialBinPurchaseCount = async () => {
      try {
        const response: AxiosResponse<number> = await request(
          'GET',
          `${API_URL}/total_commercial_bin_purchase_count/${org_id}`
        )
        setNewCommercialBins(response.data)
      } catch (error) {
        console.error('Failed to load total collections:', error)
      }
    }

    fetchCommercialBinPurchaseCount()
  }, [])

  // Fetch monthly commercial bin purchase count
  useEffect(() => {
    const fetchMonthlyCommercialPurchases = async () => {
      try {
        const response: AxiosResponse<{ month: string; count: number }[]> = await request(
          'GET',
          `${API_URL}/monthly_commercial_bins/${org_id}`
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
                    {fullBinCount}
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
                    {totalMaintenances}
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
                  NEW BIN PURCHASES
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

            {/*<Card className='col-span-1 lg:col-span-3'>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle className='text-md font-medium text-muted-foreground/70'>*/}
            {/*      NEW COMMUNAL BIN ESTABLISHMENTS*/}
            {/*    </CardTitle>*/}
            {/*    <CardDescription>*/}
            {/*      <CardContent className='px-0'>*/}
            {/*        <div className='flex flex-row items-center'>*/}
            {/*          <div className='pr-2 text-4xl font-semibold text-muted-foreground'>*/}
            {/*            35 bins*/}
            {/*          </div>*/}
            {/*          <div className='flex flex-row items-center text-primary'>*/}
            {/*            <TrendingUp className='pr-1' />*/}
            {/*            2.4%*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </CardContent>*/}
            {/*    </CardDescription>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <ChartContainer config={chartConfig2}>*/}
            {/*      <LineChart*/}
            {/*        accessibilityLayer*/}
            {/*        data={chartData2}*/}
            {/*        margin={{*/}
            {/*          left: 12,*/}
            {/*          right: 12,*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <CartesianGrid vertical={false} />*/}
            {/*        <XAxis*/}
            {/*          dataKey='month'*/}
            {/*          tickLine={false}*/}
            {/*          axisLine={false}*/}
            {/*          tickMargin={8}*/}
            {/*          tickFormatter={(value) => value.slice(0, 3)}*/}
            {/*        />*/}
            {/*        <ChartTooltip*/}
            {/*          cursor={false}*/}
            {/*          content={<ChartTooltipContent hideLabel />}*/}
            {/*        />*/}
            {/*        <Line*/}
            {/*          dataKey='desktop'*/}
            {/*          type='linear'*/}
            {/*          stroke='var(--color-desktop)'*/}
            {/*          strokeWidth={2}*/}
            {/*          dot={false}*/}
            {/*        />*/}
            {/*      </LineChart>*/}
            {/*    </ChartContainer>*/}
            {/*  </CardContent>*/}
            {/*  /!* <CardFooter className="flex-col items-start gap-2 text-sm">*/}
            {/*      <div className="flex gap-2 font-medium leading-none">*/}
            {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
            {/*      </div>*/}
            {/*      <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*      </div>*/}
            {/*    </CardFooter> *!/*/}
            {/*</Card>*/}
          </div>
        </TabsContent>
      </Tabs>

      {/*<Card className='mt-4'>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle>TOP 10 ORGANIZATIONS</CardTitle>*/}
      {/*    <CardDescription>Based on no.of bins occupied</CardDescription>*/}
      {/*  </CardHeader>*/}
      {/*  <CardContent>*/}
      {/*    <TopTen />*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </>
  )
}
