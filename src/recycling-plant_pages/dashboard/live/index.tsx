import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { bidSubmission, fetchLiveAuctions } from './data/services'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { toast } from '@/components/ui/use-toast'

interface Auction {
  id: string;
  wasteType: string;
  weight: string;
  startDate: string;
  endDate: string;
  min_bid: string;
  curr_bid: string;
  registeredPlants: number[];
}

export default function LiveAuctions() {

  const token = localStorage.getItem('token') ?? '';
  const decodeToken = jwtDecode<JwtPayload>(token) as { userId: number};
  const contId = decodeToken?.userId

  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data: any = await fetchLiveAuctions()
        console.log(data)
        const mappedData = data.map((auc: any): Auction => ({
          id: `AUC-${auc.id.toString().padStart(3, '0')}`,
          wasteType:
            auc.auctionWasteType.charAt(0).toUpperCase() +
            auc.auctionWasteType.slice(1).toLowerCase(),
          weight: `${auc.weight} KG`,
          startDate: auc.startDate.slice(0, 10),
          endDate: auc.endDate.slice(0, 10),
          min_bid: `Rs. ${auc.minimumBidAmount}`,
          curr_bid: `Rs. ${auc.minimumBidAmount}`,
          registeredPlants: auc.registeredPlants.map((plant: any) => plant.id),
        }))

        setAuctions(mappedData)
      } catch (e) {
        console.error('Failed to load Auctions', e)
      }
    }

    loadAuctions()
  }, [])

  const handleBidSubmission = async (auctionId: string, amount: number) => {
    try {
      const payload = {
        auctionId: parseInt(auctionId.replace('AUC-', ''), 10),
        recyclingPlantId: contId,
        bidAmount: amount,
      };
      console.log(payload)
      const response = await bidSubmission(payload.auctionId, payload.recyclingPlantId, payload.bidAmount);
      console.log(response)
      if (response.status === 200) {
        toast({ description: 'Bid placed successfully!' });

        setAuctions((prevAuctions) =>
          prevAuctions.map((auc: any) =>
            auc.id === auctionId
              ? { ...auc, curr_bid: `Rs. ${amount}` } 
              : auc
          )
        );
      } else {
        toast({ description: 'Bid could not be placed!' });
      }

    } catch (error: any) {
      toast({description: `Error placing bid: ${error.response?.data?.message || error.message}` });
    }
  };

  return (
    <Card className='mt-2 rounded-xl bg-card p-4'>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-muted-foreground'>
            Live Auctions
          </h2>
        </div>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={auctions} columns={columns(handleBidSubmission)} />
        
      </div>
    </Card>
  )
}
