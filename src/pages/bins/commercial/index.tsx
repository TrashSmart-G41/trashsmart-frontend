import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { cleaners } from './data/cleaners'
import { Card } from '@/components/ui/card'

export default function CommercialBins() {
  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Commercial Bins</h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={cleaners} columns={columns} />
      </div>
    </Card>
  )
}
