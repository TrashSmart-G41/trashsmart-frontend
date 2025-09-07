import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { CommunalBin } from '../data/schema'
import { CommunalDialog } from './communal_bin_dialog'
import { EditBin } from './edit-bin-form'
import { AssignBin } from './assign-bin-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/custom/button.tsx'
import React from 'react'

export const columns: ColumnDef<CommunalBin>[] = [
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
    accessorKey: 'bin_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Bin Id'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('bin_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Location'
      />
    ),
    cell: ({ row }) => {
      const location = row.getValue('location') as string

      return (
        <div className='max-w-[200px] truncate' title={location}>
          {location}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
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
      const type = row.getValue('type') as string
      const formattedType = type
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/(^|\s)\w/g, (c) => c.toUpperCase())
      return <div>{formattedType}</div>
    },
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   accessorKey: 'installed_date',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       className='text-[14px]'
  //       column={column}
  //       title='Installation Date'
  //     />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('installed_date')}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'fill_level',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Fill Level'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('fill_level')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className='flex'>
        <DataTableColumnHeader
          className='text-[14px]'
          column={column}
          title='Status'
        />
      </div>
    ),
    cell: ({ row }) => {
      const fillLevel = row.getValue('fill_level') as number
      let status = ''
      let fillColor = ''
      let displayText = status

      // Determine status based on fill level
      if (fillLevel === 0) {
        status = 'EMPTY'
      } else if (fillLevel > 0 && fillLevel < 75) {
        status = 'NORMAL'
      } else if (fillLevel >= 75 && fillLevel < 100) {
        status = 'ALMOST_FULL'
      } else if (fillLevel >= 100) {
        status = 'FULL'
      } else {
        status = 'UNKNOWN' // Default case if fillLevel is invalid
      }

      // Set fillColor based on status
      switch (status.toUpperCase()) {
        case 'NORMAL':
          fillColor =
            'bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]'
          displayText = 'NORMAL'
          break
        case 'ALMOST_FULL':
          fillColor =
            'bg-[#fff3cd] text-[#664d03] dark:bg-[#5c3c00] dark:text-[#fff3cd]'
          displayText = 'ALMOST FULL'
          break
        case 'FULL':
          fillColor =
            'bg-[#fde2e1] text-[#981b1b] dark:bg-[#7f1d1d] dark:text-[#fde2e1]'
          displayText = 'FULL'
          break
        case 'EMPTY':
          fillColor =
            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          displayText = 'EMPTY'
          break
        default:
          fillColor =
            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }

      return (
        <div className='flex'>
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
            {displayText as React.ReactNode}
          </Button>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const binId = String(row.getValue('bin_id') || '').slice(-3)
      const fillLevel = row.getValue('fill_level') as number
      console.log(binId)

      return (
        <div className='mr-4 flex items-center justify-end'>
          <CommunalDialog binId={binId} />
          <EditBin contId={binId} />
          {fillLevel > 75 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className='ml-4 rounded bg-green-700 px-2 py-1 text-sm text-white hover:bg-green-800'>
                  Assign
                </button>
              </DialogTrigger>
              <DialogContent>
                <AssignBin contId={binId} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      )
    },
  },
]
