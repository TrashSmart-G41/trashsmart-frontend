import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { fetchAllRequestsByOrganization } from './data/services'
import { jwtDecode, JwtPayload } from 'jwt-decode'

// type RequestData = {
//   id: number;
//   accumulatedVolume: number;
//   wasteType: string;
//   latitude: number;
//   longitude: number;
//   wasteCollectionRequestStatus: string;
//   createdTimeStamp: string;
// };

type Request= {
  id: string
  wasteType: string
  accumulatedVolume: string
  date: string
  time: string
  status: string
}

const token = localStorage.getItem('token') ?? ''
const decodeToken = jwtDecode<JwtPayload>(token) as { userId: number }
const contId = decodeToken?.userId
console.log(contId)

export default function Tasks() {

  const [ requests, setRequests ] = useState<Request[]>([])

  useEffect (() => {
    const loadRequests = async () => {
      try {
        const data: any = await fetchAllRequestsByOrganization(contId)
        console.log(data)
        const mappedData = data.map((req: any) => ({
          id: `WCR-${req.createdTimeStamp.replace(/-/g, '').slice(2, 8)}-${req.id.toString().padStart(3, '0')}`,
          wasteType:
            req.wasteType.charAt(0).toUpperCase() +
            req.wasteType.slice(1).toLowerCase(),
          accumulatedVolume: `${req.accumulatedVolume} CBM`,
          date: req.createdTimeStamp.slice(0, 10),
          time: req.createdTimeStamp.slice(11, 16),
          status: req.wasteCollectionRequestStatus,
        }))

        setRequests(mappedData)
      } catch (e) {
        console.error('Failed to load Requests', e)
      }
    }

    loadRequests()
  })

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
        <Card className='mt-2 rounded-xl bg-card p-4'>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
                Requests
              </h2>
            </div>
          </div>

          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={requests} columns={columns} />
          </div>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
