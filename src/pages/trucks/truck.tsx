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
    // CardDescription,
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
import map from '@/assets/trucks-map.png'


export default function Truck() {
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
                                    <BreadcrumbLink href="/trucks">Trucks</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        ABC-1234</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>


                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-6 mt-4'>
                        <div className='col-span-1 lg:col-span-3 p-4 pt-0 pb-0'>
                            <CardHeader className='p-0'>
                                <div className='flex flex-row justify-start items-center'>
                                    <CardTitle className='text-2xl font-bold'>
                                        ABC-1234</CardTitle>
                                    <Button variant="scale_btn" size="scale_btn_sm" className={`ml-2  bg-[#c0dbfe] text-[#1f40af] dark:bg-[#1f40af] dark:text-[#c0dbfe]`}>
                                        <svg className='inline-block mr-2' xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="12" fill="currentColor" />
                                        </svg>
                                        En Route
                                    </Button>
                                </div>
                            </CardHeader>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <img className='rounded-b-xl w-full object-cover' src={map} alt="Map" />
                    </div>



                </Card>




            </Layout.Body>
        </Layout >
    )
}
