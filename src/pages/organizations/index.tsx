import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { fetchOrganizations } from './data/services'
// import LocationPicker from '@/components/custom/location_picker'
// import GoogleMap, { Marker } from '@/components/custom/googlemap'
// import DragableMarker from '@/components/custom/dragablemarker'
// import RouteMap from '@/components/custom/routemap'

export default function Tasks() {
  const [organizations, setOrganizations] = useState([])
  // const mapRef = useRef<google.maps.Map | null>(null);

  // const mapRef = useRef<google.maps.Map | null>(null)

  // Define route with start, stops, and end
  // const route = {
  //   start: { lat: 6.9271, lng: 79.8612 }, // Colombo, Sri Lanka
  //   stops: [
  //     { lat: 6.9481, lng: 79.9577 }, // Stop 1
  //     { lat: 6.9275, lng: 79.9075 }, // Stop 2
  //   ],
  //   end: { lat: 6.9278, lng: 79.8532 }, // End location
  // }

  // const points = [
  //   {
  //     latitude: 6.9271,
  //     longitude: 79.8612,
  //     name: 'Colombo Fort',
  //   },
  //   {
  //     latitude: 6.9308,
  //     longitude: 79.8448,
  //     name: 'Galle Face Green',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" height="24" width="24">
  //         <rect x="6" y="6" width="12" height="12" />
  //       </svg>
  //     `,
  //   },
  //   {
  //     latitude: 6.9344,
  //     longitude: 79.8521,
  //     name: 'Beira Lake',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" height="24" width="24">
  //         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 14h2v2h-2v-2zm0-8h2v6h-2V6z" />
  //       </svg>
  //     `,
  //   },
  //   {
  //     latitude: 6.9157,
  //     longitude: 79.8636,
  //     name: 'Viharamahadevi Park',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" height="24" width="24">
  //         <polygon points="12,2 15,22 12,17 9,22" />
  //       </svg>
  //     `,
  //   },
  //   {
  //     latitude: 6.9169,
  //     longitude: 79.8687,
  //     name: 'National Museum of Colombo',
  //     svgIcon: `
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 24 24" height="24" width="24">
  //         <path d="M12 2L2 7v15h20V7L12 2zm0 2.18l8 4V20H4V8.18l8-4z" />
  //       </svg>
  //     `,
  //   },
  // ]

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
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                <div className='flex flex-row items-center'>
                  <svg
                    className='mr-1'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M6.25 12a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zM5.5 9.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75M6.25 5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zM9 12.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75m.75-4.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zM9 5.75A.75.75 0 0 1 9.75 5h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 9 5.75M13.25 12a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm-.75-2.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75M13.25 5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5z'
                    />
                    <path
                      fill='currentColor'
                      d='M2 20V3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v17q0 .26-.063.5H20a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.2-.4l-.5-.375a.75.75 0 0 1 .9-1.2l.5.375c.504.378.8.97.8 1.6v8a2 2 0 0 1-2 2h-3.562a1 1 0 0 1-.166-.018Q16.138 22 16 22h-3.75a.75.75 0 0 1-.75-.75V19h-3v2.25a.75.75 0 0 1-.75.75H4a2 2 0 0 1-2-2m2 .5h3v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25h3a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H4a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 .5.5'
                    />
                  </svg>
                  TOTAL COUNT
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  16
                </div>
                {/* <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  1.7%
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                NEW REGISTRATIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  06
                </div>
                <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  4.7%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-primary'>
                ACTIVE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-primary'>
                  14
                </div>
                {/* <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  1.7%
                </div> */}
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
                  104
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

        <Card className='mt-4'>
          <div className='rounded-xl  bg-card p-4'>
            <div className='mb-2 flex items-center justify-between space-y-2 '>
              <div>
                <h2 className='text-2xl font-semibold text-muted-foreground '>
                  Organizations
                </h2>
              </div>
            </div>

            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable data={organizations} columns={columns} />
            </div>
          </div>
        </Card>

        {/* <LocationPicker/> */}
        {/* <GoogleMap /> */}
        {/* <GoogleMap width='100%' height={500}>
          {points.map((point, index) => (
            <Marker
              key={index}
              latitude={point.latitude}
              longitude={point.longitude}
              svgIcon={point.svgIcon}
              name={point.name}
            />
          ))}
        </GoogleMap> */}

        {/* <DragableMarker /> */}

        {/* <RouteMap ref={mapRef} route={route} /> */}

        {/* <LocationPicker /> */}
      </Layout.Body>
    </Layout>
  )
}
