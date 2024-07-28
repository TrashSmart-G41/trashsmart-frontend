import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { cleaners } from './data/cleaners'
// import { MixerHorizontalIcon } from '@radix-ui/react-icons'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Card,
    CardDescription,
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
import CollectionData from './collection_data'
import GoogleMap from '../../components/custom/map'



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
                <Card className='my-2 mb-4'>

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
                                    <Button variant="scale_btn" size="scale_btn_sm" className={`ml-2  bg-[#ccfbf1] text-[#0f5e59] dark:bg-[#0f5e59] dark:text-[#ccfbf1]`}>
                                        <svg className='inline-block mr-2' xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="12" fill="currentColor" />
                                        </svg>
                                        Collecting
                                    </Button>
                                </div>
                            </CardHeader>
                        </div>
                    </div>
                    <div className='mt-4'>
                        {/* <img className='w-full object-cover h-[388px]' src={map} alt="Map" /> */}
                        <GoogleMap  />

                    </div>

                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 '>
                        <div className='col-span-1 lg:col-span-1  pt-0 pb-0 '>
                            <div>
                                <CardDescription className='px-4 pt-4'>Departed at 13:30 P.M</CardDescription>
                                <div className='p-4 pt-0 text-muted-foreground text-lg'>Next stop: <span className='text-foreground'>Akbar Lane</span></div>
                            </div>
                        </div>
                        <div className='col-span-1 lg:col-span-1 pb-0 text-right p-4'>
                            <Button variant='nav_selected'> <div className='bg-primary p-[0.15rem] mr-1 rounded-full text-primary-foreground hover:text-primary-foreground'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M15 4a2 2 0 0 1 2 2v1h1.52a2 2 0 0 1 1.561.75l1.48 1.851a2 2 0 0 1 .439 1.25V15a2 2 0 0 1-2 2a3 3 0 1 1-6 0h-4a3 3 0 1 1-6 0a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2M15 6H4v9h.764a2.997 2.997 0 0 1 4.341-.138l.131.138h5.528l.115-.121l.121-.115zm3.52 3H17v5c.82 0 1.563.33 2.105.862l.131.138H20v-4.15z"/></g></svg></div> Current volume: 70%</Button>
                        </div>
                    </div>
                    <div className='p-4 bg-background rounded-xl border-t text-muted-foreground text-sm'>Last updated 5 mins ago</div>
                </Card>

                <CollectionData />

                

            </Layout.Body>
        </Layout >
    )
}
