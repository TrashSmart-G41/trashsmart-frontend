import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Request } from '../data/schema'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Request>[] = [
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
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Request ID'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('request_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'organization',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Organization'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('organization')}</div>,
    enableSorting: false,
    // enableHiding: false,
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
    accessorKey: 'time',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Time'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('time')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'accummulated_waste',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Acc. Volume'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('accummulated_waste')}</div>,
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
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
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
      let textColor

      switch (status) {
        case 'New':
          textColor = 'text-primary'
          break
        case 'Missed':
          textColor = 'text-destructive'
          break
        case 'Collected':
          textColor = 'text-blue-500'
          break
        default:
          textColor = ''
      }

      return <div className={textColor}>{status as React.ReactNode}</div>
    },
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const navigate = useNavigate()

  //     const handleButtonClick = () => {
  //       navigate(`/drivers/${row.getValue('employee_id')}`)
  //     }

  //     return (
  //       <div className='mr-4 flex items-center justify-end'>
  //         <Button
  //           variant='ghost'
  //           className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
  //           onClick={handleButtonClick}
  //         >
  //           View
  //         </Button>
  //         <DataTableRowActions row={row} />
  //       </div>
  //     )
  //   },
  // },
]