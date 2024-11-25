import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type BidData = {
  id: string,
  bidAmount: number,
  recyclingPlants: {
    id: string,
    firstName: string,
  }
};

type BiddingProps = {
  bids: BidData[];
}

export function Biddings({ bids }: BiddingProps) {
  return (
    <div className='rounded-lg border'>
      {bids.length > 0 ? (
        <>
          <Table>
            <TableHeader className='bg-background'>
              <TableRow>
                <TableHead className='w-[100px]'>Rank</TableHead>
                <TableHead>Recycling Plant</TableHead>
                <TableHead>Plant ID</TableHead>
                <TableHead className='text-right'>Bid Amount</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className='max-h-[200px] overflow-y-auto'> {/* Fixed height and scroll */}
            <Table>
              <TableBody>
                {bids.map((bid, index) => (
                  <TableRow key={bid.id}>
                    <TableCell>
                      <div
                        className={`w-fit rounded-xl px-2 py-1 font-medium  ${
                          index === 0
                            ? 'bg-primary'
                            : index === 1
                            ? 'bg-primary/70'
                            : index === 2
                            ? 'bg-primary/60'
                            : 'bg-background'
                        }`}
                      >
                        #{index + 1}
                      </div>
                    </TableCell>
                    <TableCell>{bid.recyclingPlants.firstName}</TableCell>
                    <TableCell>{bid.recyclingPlants.id}</TableCell>
                    <TableCell className='text-right'>
                      ${bid.bidAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className='p-4 text-center text-gray-500'>No bids available.</div>
      )}
    </div>
  );
}


