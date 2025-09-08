import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { request } from '@/lib/axiosHelper.ts'

const API_URL = 'api/v1/organization'

export default function Requests() {
  const [collectionHistory, setCollectionHistory] = useState<any[]>([]);

  useEffect(() => {
    const url = window.location.href;
    const id = url.split('/').pop()?.slice(-3)
    const loadCollections = async () => {
      try {
        const response: AxiosResponse<{ request_id: string, request_date: string; volume: number; type: string; status: string }[]> = await request(
          'GET',
          `${API_URL}/fetch_requests/${id}`
        )
        // console.log(response.data)
        setCollectionHistory(response.data)
      } catch (error) {
        console.error('Failed to load monthly recyclable waste:', error)
      }
    }
    loadCollections()
  }, [])

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-xl font-bold tracking-tight text-muted-foreground'>
            Request History
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={collectionHistory} columns={columns} />
      </div>
    </Card>
  )
}
