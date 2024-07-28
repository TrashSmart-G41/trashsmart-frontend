import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { CollectionData } from '../data/schema'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<CollectionData>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Name'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'scale',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Scale'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('scale')}</div>,
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Address'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('address')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'waste_volume',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Waste Volume'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('waste_volume')}</div>,
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
      let textColor

      switch (status) {
        case 'Collected':
          textColor = 'text-primary'
          break
        case 'Cancelled':
          textColor = 'text-destructive'
          break
        case 'To do':
          textColor = ''
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
  //       navigate(`/cleaners/${row.getValue('employee_id')}`)
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
