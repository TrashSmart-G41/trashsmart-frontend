import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Dispatch } from '../data/schema'
import { DispatchesDialog } from './dispatched_dialog'

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
  // {
  //   accessorKey: 'total_collections',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       className='text-[14px]'
  //       column={column}
  //       title='Total Collections'
  //     />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('total_collections')}</div>,
  //   // enableSorting: true,
  //   // filterFn: (row, id, value) => {
  //   //   return value.includes(row.getValue(id))
  //   // },
  // },
  {
    accessorKey: 'dispatchType',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Waste Type'
      />
    ),
    cell: ({ row }) => {
      const dispatchType = row.getValue('dispatchType')
      // @ts-ignore
      const formattedDispatchType = dispatchType.charAt(0).toUpperCase() + dispatchType.slice(1).toLowerCase()
      return <div>{formattedDispatchType}</div>
    },
    enableSorting: false,
    // enableHiding: false,
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
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      let textColor

      switch (formattedStatus) {
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

      return <div className={textColor}>{formattedStatus}</div>
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      console.log(row)
      const dispId = String(row.getValue('dispatch_id') || '').slice(-3)

      return (
        <div className='mr-4 flex items-center justify-end'>
          <DispatchesDialog dispId={dispId} />
          {/* <DataTableRowActions row={row} /> */}
        </div>
      )
    },
  },
]
