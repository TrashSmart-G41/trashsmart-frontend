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
import LiveAuctions from './live'
import UpcomingAuctions from './upcoming'

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
        <Tabs defaultValue='live' className='w-full py-4 pt-0'>
          <TabsList className='mb-4 flex w-full'>
            <TabsTrigger value='live' className='flex-1 text-center'>
              LIVE
            </TabsTrigger>
            <TabsTrigger value='upcoming' className='flex-1 text-center'>
              UPCOMING
            </TabsTrigger>
          </TabsList>
          <TabsContent value='live'>
            <LiveAuctions />
          </TabsContent>
          <TabsContent value='upcoming'>
            <UpcomingAuctions />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
