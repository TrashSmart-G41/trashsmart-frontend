import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { request } from '@/lib/axiosHelper.ts'

const API_URL = 'api/v1/organization'

export default function SmartBins() {
  const [binHistory, setBinHistory] = useState<any[]>([]);

  useEffect(() => {
    const url = window.location.href;
    const id = url.split('/').pop()?.slice(-3)
    const loadBins = async () => {
      try {
        const response: AxiosResponse<{ bin_id: string; type: string; size: string; purchase_date: string; maintenance_date: string; other_notes: string }[]> = await request(
          'GET',
          `${API_URL}/fetch_bins/${id}`
        )
        console.log(response.data)
        setBinHistory(response.data)
      } catch (error) {
        console.error('Failed to load monthly recyclable waste:', error)
      }
    }
    loadBins()
  }, [])

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-xl font-bold tracking-tight text-muted-foreground'>
            Smart Bins
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={binHistory} columns={columns} />
      </div>
    </Card>
  )
}
