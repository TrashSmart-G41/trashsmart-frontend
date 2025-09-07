import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Record } from '../data/schema'
import { EditReq } from './edit-req-form'
import { DeleteReq } from './delete-req.tsx'
import { Button } from '@/components/custom/button.tsx'
import React from 'react'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Record>[] = [
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
    accessorKey: 'maintenance_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Maintenance ID'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('maintenance_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'bin_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Bin ID'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('bin_id')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Type'
      />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const formattedType = type
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/(^|\s)\w/g, c => c.toUpperCase());
      return <div>{formattedType}</div>;
    },
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Date'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-[14px]"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string

      let colorClass = ''
      let displayText = status

      switch (status.toUpperCase()) {
        case 'TO_DO':
          colorClass =
            'bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]'
          displayText = 'TO-DO'
          break
        case 'COMPLETED':
          colorClass =
            'bg-[#fff3cd] text-[#664d03] dark:bg-[#5c3c00] dark:text-[#fff3cd]'
          displayText = 'COMPLETED'
          break
        default:
          colorClass =
            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }

      return (
        <div className='flex'>
          <Button
            variant='scale_btn'
            size='scale_btn_sm'
            className={`text-[11px] ${colorClass}`}
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
            {displayText as React.ReactNode}
          </Button>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'other_notes',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Other Notes'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('other_notes')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const reqId = String(row.getValue('maintenance_id') || '').slice(-3)
      console.log(reqId)

      return (
        <div className='mr-4 flex items-center justify-end'>
          <EditReq contId={reqId} />
          <DeleteReq contId={reqId} />
        </div>
      )
    },
  },
]
