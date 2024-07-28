import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Truck } from '../data/schema'
import { Button } from '@/components/custom/button'
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"

export const columns: ColumnDef<Truck>[] = [
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
    accessorKey: 'truck_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Truck ID'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('truck_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'licence_plate_number',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='LICENSE PLATE NO.'
        className='text-center text-[14px]'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('licence_plate_number')}</div>,
  },
  {
    accessorKey: 'max_load_capacity',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='MAX. LOAD CAPACITY'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('max_load_capacity')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className='flex'>
        {/* <DataTableColumnHeader column={column} title='Status' /> */}
        <DataTableColumnHeader
          className='text-[14px]'
          column={column}
          title='Status'
        />
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')
      if (status === 'En Route') {
        var fillColor =
          'bg-[#c0dbfe] text-[#1f40af] dark:bg-[#1f40af] dark:text-[#c0dbfe]'
      } else if (status === 'Returning') {
        var fillColor =
          'bg-[#ffdcb1] text-[#981b1b] dark:bg-[#7f1d1d] dark:text-[#ffdcb1]'
      } else if (status === 'Collecting') {
        var fillColor =
          'bg-[#ccfbf1] text-[#0f5e59] dark:bg-[#0f5e59] dark:text-[#ccfbf1]'
      } else {
        var fillColor =
          'bg-[#ebebeb] text-[#0f1b2b] dark:bg-[#0f1b2b] dark:text-[#ebebeb]'
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
            {status as React.ReactNode}
          </Button>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'next_shift',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='NEXT SHIFT'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('next_shift')}</div>,
  },
  {
    accessorKey: 'milage',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Milage'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('milage')}</div>,
  },

  // {
  //   id: 'actions',
  //   header: () => null,
  //   cell: ({ row }: { row: { getValue: (key: string) => string; employee_id?: string } }) => {
  //     const navigate = useNavigate()

  //     const handleButtonClick = () => {
  //       navigate(`/cleaners/${row.getValue('employee_id')}`)
  //     }

  //     return (
  //       <div className='mr-4 text-right'>
  //         <Button
  //           variant='ghost'
  //           className='flex h-8  px-2 text-[12px] text-primary/80 hover:text-primary'
  //           onClick={handleButtonClick}
  //         >
  //           View
  //         </Button>
  //       </div>
  //     )
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      const navigate = useNavigate()

      const handleButtonClick = () => {
        navigate(`/trucks/${row.getValue('truck_id')}`)
      }

      return (
        <div className='mr-4 flex items-center justify-end'>
          <Button
            variant='ghost'
            className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
            onClick={handleButtonClick}
          >
            View
          </Button>
          <DataTableRowActions row={row} />
        </div>
      )
    },
  },
]
