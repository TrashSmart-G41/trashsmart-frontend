import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { fetchAllAuctions } from './data/services'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

export default function CanceledAuctions() {
  const [ auctions, setAuctions ] = useState([]);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data :any = await fetchAllAuctions();
        console.log(data);
        const mappedData = data.map((auc: any) => ({
          id: `AUC-${auc.id.toString().padStart(3, '0')}`,
          wasteType: auc.auctionWasteType.charAt(0).toUpperCase() + auc.auctionWasteType.slice(1).toLowerCase(),
          weight: `${auc.weight} KG`,
          startDate: auc.startDate.slice(0, 10),
          endDate: auc.endDate.slice(0, 10),
          min_bid: `Rs. ${auc.minimumBidAmount}`,
          status: auc.status,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.id.localeCompare(a.id)
        )
        setAuctions(sortedData);
      } catch (e) {
        console.error("Failed to load Auctions", e);
      }
    }

    loadAuctions();
  }, [])

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Auctions
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={auctions} columns={columns} />
      </div>
    </Card>
  )
}
