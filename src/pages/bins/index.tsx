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
import Insights from './insights/insights'
import CommunalBins from './communal'
import CommercialBins from './commercial'
import Maintenance from './maintenance'

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
        <Tabs defaultValue='communal' className='w-full py-4 pt-0'>
          <TabsList className='mb-4 flex w-full'>
            <TabsTrigger value='communal' className='flex-1 text-center'>
              Communal Bins
            </TabsTrigger>
            <TabsTrigger value='commercial' className='flex-1 text-center'>
              Commercial Bins
            </TabsTrigger>
            <TabsTrigger value='maintenance' className='flex-1 text-center'>
              Maintenance
            </TabsTrigger>
            <TabsTrigger value='insights' className='flex-1 text-center'>
              Insights
            </TabsTrigger>
          </TabsList>
          <TabsContent value='communal'>
            <CommunalBins />
          </TabsContent>
          <TabsContent value='commercial'>
            <CommercialBins />
          </TabsContent>
          <TabsContent value='maintenance'>
            <Maintenance />
          </TabsContent>
          <TabsContent value='insights'>
            <Insights />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
