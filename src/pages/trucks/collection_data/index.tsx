import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { collections } from './data/collections'
import { Card } from '@/components/ui/card'

export default function CollectionData() {
  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-xl font-bold tracking-tight text-muted-foreground'>
            Collection Data
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={collections} columns={columns} />
      </div>
    </Card>
  )
}
