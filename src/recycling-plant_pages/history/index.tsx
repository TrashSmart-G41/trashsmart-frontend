import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { Card } from '@/components/ui/card'
// import { z } from 'zod'
import { columns } from './components/columns'
import { fetchPastAuctions } from './data/services'
import { useEffect, useState } from 'react'

// export const allAuctionsSchema = z.object({
//   id: z.string(),
//   wasteType: z.string(),
//   weight: z.string(),
//   startDate: z.string(),
//   endDate: z.string(),
//   min_bid: z.string(),
//   curr_bid: z.string(),
// })

// export type AllAuctions = z.infer<typeof allAuctionsSchema>

export default function PastAuctions() {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data: any = await fetchPastAuctions()
        console.log(data)
        const mappedData = data.map((auc: any) => ({
          id: `AUC-${auc.id.toString().padStart(3, '0')}`,
          wasteType:
            auc.auctionWasteType.charAt(0).toUpperCase() +
            auc.auctionWasteType.slice(1).toLowerCase(),
          weight: `${auc.weight} KG`,
          startDate: auc.startDate.slice(0, 10),
          endDate: auc.endDate.slice(0, 10),
          min_bid: `Rs. ${auc.minimumBidAmount}`,
          curr_bid: `Rs. ${auc?.currentBid ? auc.currentBid : 'N/A'}`,
        }))

        const sortedData = mappedData.sort((a: any, b: any) =>
          b.auction_id.localeCompare(a.auction_id)
        )
        setAuctions(sortedData)
      } catch (e) {
        console.error('Failed to load Auctions', e)
      }
    }

    loadAuctions()
  }, [])
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
        <Card className='mt-2 rounded-xl bg-card p-4'>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
              Auction History
            </h2>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={auctions} columns={columns} />
        </div>
      </Card>
      </Layout.Body>
    </Layout>
  )
}
