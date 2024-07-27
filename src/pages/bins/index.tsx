import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { DataTable } from './components/data-table'
// import { columns } from './components/columns'
// import { tasks } from './data/tasks'
// import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/dashtabs"
import Insights from './insights'
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
        <Tabs defaultValue="communal" className="w-full py-4 pt-0">
          <TabsList className="flex w-full mb-4">
            <TabsTrigger value="communal" className="flex-1 text-center">Communal Bins</TabsTrigger>
            <TabsTrigger value="commercial" className="flex-1 text-center">Commercial Bins</TabsTrigger>
            <TabsTrigger value="maintenance" className="flex-1 text-center">Maintenance</TabsTrigger>
            <TabsTrigger value="insights" className="flex-1 text-center">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="communal">
            {/* <Card className='rounded-xl bg-card p-4'>
              <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                  <h2 className='text-2xl font-bold tracking-tight'>Communal Bins</h2>
                </div>
              </div>

              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable data={tasks} columns={columns} />
              </div>
            </Card> */}
            <CommunalBins/>
          </TabsContent>
          <TabsContent value="commercial"><CommercialBins/></TabsContent>
          <TabsContent value="maintenance"><Maintenance/></TabsContent>
          <TabsContent value="insights"><Insights/></TabsContent>
        </Tabs>

      </Layout.Body>
    </Layout >
  )
}
