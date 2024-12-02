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
import Household from '/Users/mashawickramasinghe/Desktop/UCSC/3rd Year/Group Project 2/trashsmart-frontend/src/pages/dispatches/household/index'
import Organizational from '/Users/mashawickramasinghe/Desktop/UCSC/3rd Year/Group Project 2/trashsmart-frontend/src/pages/dispatches/organizational/index.tsx'

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
        <Tabs defaultValue='organizational' className='w-full py-4 pt-0'>
          <TabsList className='mb-4 flex w-full'>
            <TabsTrigger value='organizational' className='flex-1 text-center'>
              Organizational
            </TabsTrigger>
            <TabsTrigger value='household' className='flex-1 text-center'>
              Household
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value='organizational'>
            <Organizational />
          </TabsContent>
          <TabsContent value='household'>
            <Household />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}