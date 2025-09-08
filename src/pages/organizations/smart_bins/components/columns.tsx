import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Bin } from '../data/schema'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Bin>[] = [
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
      <DataTableColumnHeader column={column} title='Bin ID' />
    ),
    cell: ({ row }) => <div>{row.getValue('bin_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const rawType = row.getValue('type'); // e.g., "NON_BIO_DEGRADABLE - GENERAL"
      const formattedType = rawType
        .split('-')[0]
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      return <div>{formattedType}</div>;
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Capacity' />
    ),
    cell: ({ row }) => {
      const rawType = row.getValue('size'); // e.g., "NON_BIO_DEGRADABLE - GENERAL"
      const formattedType = rawType
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());
      return <div>{formattedType}</div>;
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'purchase_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Purchase Date' />
    ),
    cell: ({ row }) => <div>{row.getValue('purchase_date')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'maintenance_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Maintenance on' />
    ),
    cell: ({ row }) => <div>{row.getValue('maintenance_date')}</div>,
    enableSorting: false,
    // enableSorting: true,
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
  },
  {
    accessorKey: 'other_notes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Other Notes' />
    ),
    cell: ({ row }) => <div>{row.getValue('other_notes')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
]
