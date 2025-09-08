import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { RequestHistory } from '../data/schema'
import { Button } from '@/components/custom/button.tsx'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<RequestHistory>[] = [
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
    accessorKey: 'request_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Request Id' />
    ),
    cell: ({ row }) => <div>{row.getValue('request_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'request_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Request Date' />
    ),
    cell: ({ row }) => {
      const requestDate = row.getValue('request_date') as string;
      const formattedDate = requestDate.replace('T', ' T');
      return <div>{formattedDate}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'time',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Time' />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('time')}</div>,
  //   enableSorting: false,
  //   // enableHiding: false,
  // },
  {
    accessorKey: 'volume',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Accummlated Volume' />
    ),
    cell: ({ row }) => <div>{row.getValue('volume')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waste Type" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('type');
      return (
        <div>
          {value
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Status'
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')
      // @ts-ignore
      let fillColor

      switch (status) {
        case 'NEW':
          fillColor =
            'bg-[#cce5ff] text-[#004085] dark:bg-[#004085] dark:text-[#cce5ff]';
          break
        case 'MISSED':
          fillColor =
            'bg-[#fde2e1] text-[#981b1b] dark:bg-[#7f1d1d] dark:text-[#fde2e1]'
          break
        case 'COLLECTING':
          fillColor =
            'bg-[#fff3cd] text-[#664d03] dark:bg-[#5c3c00] dark:text-[#fff3cd]';
          break
        case 'COLLECTED':
          fillColor =
            'bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]'
          break;
        default:
          fillColor =
            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }

      return (
        <div className='flex '>
          <Button
            variant='scale_btn'
            size='scale_btn_sm'
            className={`text-[11px] ${fillColor}`}
          >
            <svg
              className='mr-2 inline-block'
              xmlns='http://www.w3.org/2000/svg'
              width='6'
              height='6'
              viewBox='0 0 24 24'
            >
              <circle cx='12' cy='12' r='12' fill='currentColor' />
            </svg>
            {status}
          </Button>
        </div>
      )
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
