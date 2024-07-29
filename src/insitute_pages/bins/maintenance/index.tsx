import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { records } from './data/records'
import { Card } from '@/components/ui/card'

export default function Maintenance() {
  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Maintenance Records
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={records} columns={columns} />
      </div>
    </Card>
  )
}
