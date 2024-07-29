import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { commercialBins } from './data/commercialBins'
import { Card } from '@/components/ui/card'

export default function CommercialBins() {
  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Commercial Bins
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={commercialBins} columns={columns} />
      </div>
    </Card>
  )
}
