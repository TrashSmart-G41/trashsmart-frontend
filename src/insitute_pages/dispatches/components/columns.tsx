import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Dispatch } from '../data/schema'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Dispatch>[] = [
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
    accessorKey: 'dispatch_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Dispatch Id'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('dispatch_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'region',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Region'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('region')}</div>,
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
    accessorKey: 'total_collections',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Total Collections'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('total_collections')}</div>,
    // enableSorting: true,
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
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
        case 'Cancelled':
          textColor = 'text-destructive'
          break
        case 'Dispatched':
          textColor = 'text-blue-500'
          break
        default:
          textColor = ''
      }

      return <div className={textColor}>{status as React.ReactNode}</div>
    },
    enableSorting: true,
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
