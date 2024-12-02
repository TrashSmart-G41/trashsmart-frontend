import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { fetchDispatches } from './data/services'

export default function Household() {
  const [householdDispatches, setHouseholdDispatches] = useState([])

  useEffect(() => {
    const loadHouseholdDispatches = async () => {
      try {
        const data: any = await fetchDispatches()
        console.log(data)
        const mappedData: any = data.map((householddispatch: any) => {
          const dateTime = new Date(householddispatch.dateTime)
          const date = dateTime.toISOString().split('T')[0]
          const time = dateTime.toTimeString().split(' ')[0]

          return {
            dispatch_id: `DR-${householddispatch.id.toString().padStart(3, '0')}`,
            date: date,
            time: time,
            status: householddispatch.dispatchStatus,
          }
        })

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.dispatch_id.localeCompare(a.dispatch_id)
        )
        setHouseholdDispatches(sortedData)
      } catch (error) {
        console.error('Failed to load:', error)
      }
    }

    loadHouseholdDispatches()
  }, [])

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Household Dispatches
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={householdDispatches} columns={columns} />
      </div>
    </Card>
  )
}