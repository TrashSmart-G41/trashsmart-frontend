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
// import LocationPicker from '@/components/custom/location_picker'
// import GoogleMap from '../../components/custom/map'
import GoogleMap, { Marker } from '@/components/custom/googlemap'
// import MapMarker from '@/components/custom/mapmarker'
import { useEffect, useState } from 'react'
import { fetchOrganization } from './data/services'
// import Map2 from '@/components/custom/map2'

type OrganizationData = {
  firstName: string
  address: string
}

export default function Organization() {
  const [organization, setOrganization] = useState<OrganizationData | null>(
    null
  )

  useEffect(() => {
    const url = window.location.href
    const id = url.split('/').pop()?.slice(-3)
    console.log('id:', id)

    const loadOrganization = async () => {
      try {
        const data: any = await fetchOrganization(id ?? '')
        const mappedData: OrganizationData = {
          firstName: data.firstName,
          address: data.address,
        }
        // console.log('Organization:', data)
        setOrganization(mappedData)
        console.log('Organization:', organization)
      } catch (error) {
        console.error('Failed to load organization:', error)
      }
    }
    loadOrganization()
  }, [])

  const points = [
    {
      latitude: 6.9271,
      longitude: 79.8612,
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" height="24" width="24">
  <path
    fill-rule="evenodd"
    d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
  />
</svg>
`,
      name: 'Colombo Fort',
    },
    // {
    //   latitude: 6.9308,
    //   longitude: 79.8448,
    //   name: 'Galle Face Green',
    //   svgIcon: `
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" height="24" width="24">
    //       <rect x="6" y="6" width="12" height="12" />
    //     </svg>
    //   `,
    // },
  ]
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
                {/* <GoogleMap
                  className='h-full w-full rounded-t-xl'
                  height={200}
                /> */}
                {/* <GoogleMap width='100%' height={200} scrollable={false}> */}
                {/* <MapMarker latitude={6.902} longitude={79.8614} /> */}
                {/* <MapMarker latitude={6.912} longitude={79.852}  />
          <MapMarker latitude={6.922} longitude={79.842}  /> */}
                {/* </GoogleMap> */}
                {/* <Map2/> */}
                {/* <LocationPicker /> */}

                <GoogleMap width='100%' height={200} scrollable={false}>
                  {points.map((point, index) => (
                    <Marker
                      key={index}
                      latitude={point.latitude}
                      longitude={point.longitude}
                      svgIcon={point.svgIcon}
                      name={point.name}
                    />
                  ))}
                </GoogleMap>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
              <div className='col-span-1 p-4 pt-0 lg:col-span-3'>
                <CardHeader className='p-0'>
                  <div className='flex flex-row items-center justify-start'>
                    <CardTitle className='text-2xl font-bold text-muted-foreground'>
                      {organization?.firstName}
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
                  <CardDescription>{organization?.address}</CardDescription>
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
