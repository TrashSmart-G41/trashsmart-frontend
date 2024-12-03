import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import logo from '../../assests/ucsc.png'

const tops = [
  {
    rank: '1',
    organization: 'University of Colombo School of Computing ',
    logo: logo,
    no_of_bins: '34',
    waste_acc_last_7: [1, 2, 3, 4, 5, 2, 3],
  },
  {
    rank: '2',
    organization: 'University of Peradeniya',
    logo: logo,
    no_of_bins: '45',
    waste_acc_last_7: [2, 4, 3, 7, 5, 2, 6],
  },
  {
    rank: '3',
    organization: 'University of Moratuwa',
    logo: logo,
    no_of_bins: '50',
    waste_acc_last_7: [3, 5, 6, 4, 7, 3, 8],
  },
  {
    rank: '4',
    organization: 'University of Jaffna',
    logo: logo,
    no_of_bins: '38',
    waste_acc_last_7: [1, 2, 3, 4, 5, 2, 3],
  },
  {
    rank: '5',
    organization: 'University of Ruhuna',
    logo: logo,
    no_of_bins: '42',
    waste_acc_last_7: [4, 5, 6, 7, 8, 5, 6],
  },
  {
    rank: '6',
    organization: 'Eastern University, Sri Lanka',
    logo: logo,
    no_of_bins: '29',
    waste_acc_last_7: [2, 3, 2, 3, 4, 1, 2],
  },
  {
    rank: '7',
    organization: 'South Eastern University of Sri Lanka',
    logo: logo,
    no_of_bins: '33',
    waste_acc_last_7: [3, 4, 5, 6, 4, 3, 5],
  },
  {
    rank: '8',
    organization: 'University of the Visual and Performing Arts',
    logo: logo,
    no_of_bins: '20',
    waste_acc_last_7: [1, 1, 2, 2, 3, 2, 1],
  },
  {
    rank: '9',
    organization: 'University of Kelaniya',
    logo: logo,
    no_of_bins: '55',
    waste_acc_last_7: [5, 6, 7, 8, 9, 6, 7],
  },
  {
    rank: '10',
    organization: 'University of Sri Jayewardenepura',
    logo: logo,
    no_of_bins: '60',
    waste_acc_last_7: [6, 7, 8, 9, 10, 7, 8],
  },
  {
    rank: '11',
    organization: 'Sabaragamuwa University of Sri Lanka',
    logo: logo,
    no_of_bins: '37',
    waste_acc_last_7: [2, 2, 3, 4, 5, 3, 4],
  },
]

export function TopTen() {
  return (
    <div className='rounded-lg border'>
      <Table>
        {/* <TableCaption>A list of your recent tops.</TableCaption> */}
        <TableHeader className='bg-background'>
          <TableRow>
            <TableHead className='w-[100px]'>Rank</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>NO.OF.BINS</TableHead>
            <TableHead className='text-right'>
              WASTE ACCUMULATION (LAST 07 DAYS)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tops.map((invoice) => (
            <TableRow key={invoice.rank}>
              <TableCell>
                <div
                  className={`w-fit rounded-xl px-2 py-1 font-medium  ${invoice.rank === '1' ? 'bg-primary' : invoice.rank === '2' ? 'bg-primary/70' : invoice.rank === '3' ? 'bg-primary/60' : 'bg-background'}`}
                >
                  #{invoice.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center space-x-4'>
                  <img src={invoice.logo} alt='Logo' className='w-12' />
                  <span>{invoice.organization}</span>
                </div>
              </TableCell>
              <TableCell>{invoice.no_of_bins}</TableCell>
              <TableCell className='text-right'>1.2MT</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
      </Table>
    </div>
  )
}
