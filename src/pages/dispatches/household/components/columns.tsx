import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { Dispatch } from '../data/schema'
import { DispatchesDialog } from './dispatched_dialog'
import { Button } from '@/components/custom/button.tsx'
// import React from 'react'

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
      const formattedDispatchType = dispatchType
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

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
      // const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      let fillColor

      switch (status) {
        case 'NEW':
          fillColor =
            'bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]'
          break
        case 'CANCELLED':
          fillColor =
            'bg-[#fde2e1] text-[#981b1b] dark:bg-[#7f1d1d] dark:text-[#fde2e1]'
          break
        case 'DISPATCHED':
          fillColor =
            'bg-[#ccfbf1] text-[#0f5e59] dark:bg-[#0f5e59] dark:text-[#ccfbf1]'
          break
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
  {
    id: 'actions',
    cell: ({ row }) => {
      const disp_id = String(row.getValue('dispatch_id') || '').slice(-3)
      return (
        <div className='mr-4 flex items-center justify-end'>
          <DispatchesDialog dispId={disp_id} />
        </div>
      )
    },
  },
]
