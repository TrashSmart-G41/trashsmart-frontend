import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/dashtabs'
import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { tasks } from './data/tasks'
// import mapImg from '@/assets/map.jpg'
import { Button } from '../../components/custom/button'
import Info from './info'
import Requests from './requests'
import SmartBins from './smart_bins'
import Collections from './collections'
import GoogleMap from '../../components/custom/map'

export default function Organization() {
  return (
    <>
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
            <div>
              {/* <img className='rounded-t-xl max-h-[200px] w-full object-cover' src={mapImg} alt="Map" /> */}
              <div className='overflow-hidden rounded-t-xl'>
                <GoogleMap
                  className='h-full w-full rounded-t-xl'
                  height={200}
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
              <div className='col-span-1 p-4 pt-0 lg:col-span-3'>
                <CardHeader className='p-0'>
                  <div className='flex flex-row items-center justify-start'>
                    <CardTitle className='text-2xl font-bold'>
                      Infinite Education Network
                    </CardTitle>
                    <Button
                      variant='scale_btn'
                      size='scale_btn'
                      className='ml-4 bg-cyan-500/25 text-cyan-500 '
                    >
                      <svg
                        className='mr-2 inline-block'
                        xmlns='http://www.w3.org/2000/svg'
                        width='8'
                        height='8'
                        viewBox='0 0 24 24'
                      >
                        <circle cx='12' cy='12' r='12' fill='currentColor' />
                      </svg>
                      Large Scale
                    </Button>
                  </div>
                  <CardDescription>
                    789 University Avenue, Cambridge, MA, USA
                  </CardDescription>
                  <CardDescription className='pt-3 text-muted-foreground/60'>
                    Joined on 27-03-2024 20:14 PM
                  </CardDescription>
                </CardHeader>
              </div>
              <div className='col-span-1 flex items-center p-4 pt-0 sm:justify-start sm:pt-0 lg:col-span-3 lg:justify-end'>
                <Button className='hidden px-2 md:block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fill='currentColor'
                      fill-rule='evenodd'
                      d='M3.5 1.5v13h5.75a.75.75 0 0 1 0 1.5H3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6.644a1 1 0 0 1 .72.305l3.355 3.476a1 1 0 0 1 .281.695V6.25a.75.75 0 0 1-1.5 0V6H9.75A1.75 1.75 0 0 1 8 4.25V1.5zm6 .07l2.828 2.93H9.75a.25.25 0 0 1-.25-.25zM13 15a.75.75 0 0 1-.75-.75v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5A.75.75 0 0 1 13 15'
                      clip-rule='evenodd'
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>

          <Tabs defaultValue='collections' className='w-full py-4'>
            <TabsList className='mb-4 flex w-full'>
              <TabsTrigger value='collections' className='flex-1 text-center'>
                Collections
              </TabsTrigger>
              <TabsTrigger value='smartbins' className='flex-1 text-center'>
                Smart Bins
              </TabsTrigger>
              <TabsTrigger value='requests' className='flex-1 text-center'>
                Requests
              </TabsTrigger>
              <TabsTrigger value='info' className='flex-1 text-center'>
                Info
              </TabsTrigger>
            </TabsList>
            <TabsContent value='collections'>
              <Collections />
            </TabsContent>
            <TabsContent value='smartbins'>
              <SmartBins />
            </TabsContent>
            <TabsContent value='requests'>
              <Requests />
            </TabsContent>
            <TabsContent value='info'>
              <Info />
            </TabsContent>
          </Tabs>
        </Layout.Body>
      </Layout>
    </>
  )
}
