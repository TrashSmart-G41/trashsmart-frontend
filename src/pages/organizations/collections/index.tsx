import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { collectionHistory } from './data/collectionHistory'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TrendingDown, TrendingUp } from 'lucide-react'

export default function Collections() {
  return (
    <>
      <div className='mb-4 mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
            <CardTitle className='text-md font-medium text-muted-foreground/70'>
              TOTAL VOLUME
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row items-center'>
              <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                1200 MT
              </div>
              {/* <div className='flex flex-row text-primary'>
                      <TrendingUp className='pr-1' />
                      1.7%
                    </div> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
            <CardTitle className='text-md font-medium text-primary'>
              WEEKLY WASTE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row items-center'>
              <div className='pr-2 text-4xl font-semibold text-primary'>
                190 MT
              </div>
              <div className='flex flex-row text-primary'>
                <TrendingUp className='pr-1' />
                1.7%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
            <CardTitle className='text-md font-medium text-muted-foreground/70'>
              WEEKLY REQUESTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row items-center'>
              <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                03
              </div>
              <div className='flex flex-row text-destructive'>
                <TrendingDown className='pr-1' />
                1.7%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
            <CardTitle className='text-md font-medium text-muted-foreground/70'>
              RECYCLABLE VOLUME
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row items-center'>
              <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                238 MT
              </div>
              {/* <div className='flex flex-row text-destructive'>
                      <TrendingDown className='pr-1' />
                      0.8%
                    </div> */}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='mt-2 rounded-xl bg-card p-4'>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-muted-foreground'>
              Collection History
            </h2>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={collectionHistory} columns={columns} />
        </div>
      </Card>
    </>
  )
}
