import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import BiddingPopup from '../../popups/biddingPopup'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import RegistrationPopup from '../../popups/RegistrationPopup'
import { registerForAuction } from '../data/services'

interface Auction {
  id: string;
  weight: string;
  startDate: string;
  endDate: string;
  wasteType: string;
  min_bid: string;
  curr_bid: string;
  registeredPlants: number[];
}
export const columns = (
  handleBidSubmission: (auctionId: string, amount: number) => void
): ColumnDef<Auction>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Auction Id'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'wasteType',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Waste Type'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('wasteType')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Weight'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('weight')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Start Date'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('startDate')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='End Date'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('endDate')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'min_bid',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Min. Bid'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('min_bid')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'curr_bid',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Current Bid'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('curr_bid')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const navigate = useNavigate()

      const handleButtonClick = () => {
        navigate(`/recycling-plant/${row.getValue('id')}`)
      }

      const token = localStorage.getItem('token') ?? '';
      const decodeToken = jwtDecode<JwtPayload>(token) as { userId: number};
      const currentPlantId = decodeToken?.userId;

      const isRegistered = row.original.registeredPlants.includes(currentPlantId);
      
      const handleRegister = async (auctionId: string) => {
        try {
          const response = await registerForAuction(parseInt(auctionId.replace('AUC-', ''), 10), currentPlantId);
          if (response.status === 200) {
            console.log('Successfully registered');
            window.location.reload();
          }

        } catch (error: any) {
          console.error('Failed to register:', error);
        }
      }

      return (
        <>
          <div className='mr-4 flex items-center justify-end'>
            <Button
              variant='ghost'
              className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
              onClick={handleButtonClick}
            >
              View
            </Button>
            {isRegistered ? (
                <BiddingPopup
                auction={row.getValue('id')}
                wasteType={row.getValue('wasteType')}
                minimumBidAmount={parseFloat((row.getValue('min_bid') as string).replace('Rs. ', ''))}
                currentBid={parseFloat((row.getValue('curr_bid') as string).replace('Rs. ', ''))}
                onBid={(amount) => {
                  console.log(`Bid placed: ${amount}`);
                  handleBidSubmission(row.getValue('id'), amount);
                }}
              />
            ) : (
              <RegistrationPopup
                auction={row.getValue('id')}
                wasteType={row.getValue('wasteType')}
                min_bid={row.getValue('min_bid')}
                curr_bid={row.getValue('curr_bid')}
                onRegister={() => handleRegister(row.getValue('id') as string)}
                />
            )}
          </div>
        </>
      )
    },
  },
]
