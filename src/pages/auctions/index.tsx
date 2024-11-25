import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { tasks } from './data/tasks'
// import { Card } from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/dashtabs'
import AllAuctions from './all'
import LiveAuctions from './live'
import PastAuctions from './past'
import UpcomingAuctions from './upcoming'
import CanceledAuctions from './canceled'

export default function Tasks() {
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
        <Tabs defaultValue='all' className='w-full py-4 pt-0'>
          <TabsList className='mb-4 flex w-full'>
            <TabsTrigger value='all' className='flex-1 text-center'>
              ALL
            </TabsTrigger>
            <TabsTrigger value='live' className='flex-1 text-center'>
              LIVE
            </TabsTrigger>
            <TabsTrigger value='past' className='flex-1 text-center'>
              PAST
            </TabsTrigger>
            <TabsTrigger value='upcoming' className='flex-1 text-center'>
              UPCOMING
            </TabsTrigger>
            <TabsTrigger value='canceled' className='flex-1 text-center'>
              CANCELED
            </TabsTrigger>


          </TabsList>
          <TabsContent value='all'>
            <AllAuctions />
          </TabsContent>
          <TabsContent value='live'>
            <LiveAuctions />
          </TabsContent>
          <TabsContent value='past'>
            <PastAuctions />
          </TabsContent>
          <TabsContent value='upcoming'>
            <UpcomingAuctions />
          </TabsContent>
          <TabsContent value='canceled'>
            <CanceledAuctions />
          </TabsContent>
 
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
