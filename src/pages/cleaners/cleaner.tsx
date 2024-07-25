import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { cleaners } from './data/cleaners'
// import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", collections: 2 },
    { month: "February", collections: 5 },
    { month: "March", collections: 7 },
    { month: "April", collections: 5 },
    { month: "May", collections: 8 },
    { month: "June", collections: 1 },
    { month: "July", collections: 3 },
    { month: "August", collections: 4 },
    { month: "September", collections: 6 },
    { month: "October", collections: 2 },
    { month: "November", collections: 9 },
    { month: "December", collections: 5 },
]
const chartConfig = {
    collections: {
        label: "Collections",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


export default function Cleaner() {
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
                <Card className='mt-2'>

                    <div className='pt-4 px-4'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/cleaners">Cleaners</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>John Smith</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>


                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-6 mt-4'>
                        <div className='col-span-1 lg:col-span-3 p-4 pt-0 pb-0'>
                            <CardHeader className='p-0'>
                                <div className='flex flex-row justify-start items-center'>
                                    <CardTitle className='text-2xl font-bold'>John Smith</CardTitle>
                                    <Button variant="scale_btn" size="scale_btn_sm" className={`ml-2  bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]`}>
                                        <svg className='inline-block mr-2' xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="12" fill="currentColor" />
                                        </svg>
                                        Active
                                    </Button>
                                </div>
                                <CardDescription>789 University Avenue, Cambridge, MA, USA</CardDescription>
                            </CardHeader>
                        </div>

                        <div className='col-span-1 lg:col-span-3 p-4 pt-0 pb-0'>
                            <Button
                                variant='outline'
                                size='sm'
                                className='ml-auto hidden h-8 lg:flex'
                            >
                                {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
                                <svg className='mr-2 h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06" /></svg>
                                Edit
                            </Button>
                        </div>


                    </div>

                    <Separator className=' my-2' />

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 m-4">
                        <div className="flex justify-center items-center">
                            <Avatar className='w-28 h-28 rounded-sm'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <div>
                                <CardDescription className='text-[12px]'>Employee ID</CardDescription>
                                <div className='font-medium text-muted-foreground'>EMP10001</div>
                            </div>
                            <div className='mt-2'>
                                <CardDescription className='text-[12px]'>Full Name</CardDescription>
                                <div className='font-medium text-muted-foreground'>Mudiyanselage John Smith Wijesiri</div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardDescription className='text-[12px]'>Contact Number</CardDescription>
                                <div className='font-medium text-muted-foreground'>0774936421</div>
                            </div>
                            <div className='mt-2'>
                                <CardDescription className='text-[12px]'>Address</CardDescription>
                                <div className='font-medium text-muted-foreground'>123/4, Galle Road, Colombo 03</div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <CardDescription className='text-[12px]'>Date of Birth</CardDescription>
                                <div className='font-medium text-muted-foreground'>14-06-1968</div>
                            </div>
                            <div className='mt-2'>
                                <CardDescription className='text-[12px]'>NIC</CardDescription>
                                <div className='font-medium text-muted-foreground'>19686860163v</div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className='grid grid-cols-1 gap-4 lg:grid-cols-6 mt-4'>
                    <Card className='col-span-1 lg:col-span-2 p-4'>
                        <div>
                            <div className='font-normal text-muted-foreground'>Total Collections </div>
                            <div className='flex items-center text-[25px] font-semibold text-muted-foreground'>
                                112 <TrendingUp className="h-4 w-4 mx-2 text-primary" /> <span className='font-normal text-[12px] text-primary'>1.7%</span>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='font-normal text-muted-foreground'>Current Streak</div>
                            <div className='text-[25px] font-semibold text-muted-foreground'>3</div>
                        </div>
                        <div className='mt-4'>
                            <div className='font-normal text-muted-foreground'>Longest Streak</div>
                            <div className='text-[25px] font-semibold text-muted-foreground'>10</div>
                        </div>
                        <div className='mt-4'>
                            <div className='font-normal text-muted-foreground'>Total Working Days</div>
                            <div className='text-[25px] font-semibold text-muted-foreground'>245</div>
                        </div>
                        <div className='mt-4'>
                            <div className='font-normal text-muted-foreground'>No. of Leaves</div>
                            <div className='text-[25px] font-semibold text-muted-foreground'>2</div>
                        </div>
                    </Card>

                    <Card className='col-span-1 lg:col-span-4 p-4'>
                        <div className='text-muted-foreground text-xl font-semibold'>Collection Analysis</div>
                        <CardDescription className="text-[11px]">01-01-2022 to 31-12-2022</CardDescription>
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
                                    dataKey="month"
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
                                    dataKey="collections"
                                    type="natural"
                                    stroke="var(--color-collections)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>


                    </Card>
                </div>
            </Layout.Body>
        </Layout >
    )
}
