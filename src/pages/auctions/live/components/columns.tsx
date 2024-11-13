import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { AllAuctions } from '../data/schema'
import { useNavigate } from 'react-router-dom'
// import { CommercialDialog } from './commercial_bin_dialog'
import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<AllAuctions>[] = [
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

      // const contId = String(row.getValue('id') || '').slice(-3)

      const handleButtonClick = () => {
        navigate(`/auctions/${row.getValue('id')}`)
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

            {/* <DataTableRowActions row={row} /> */}
          </div>
        </>
      )
    },
  },
]
