import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { scales } from '../data/data'
import { Task } from '../data/schema'
import { Button } from '@/components/custom/button'

export const columns: ColumnDef<Task>[] = [
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
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'scale',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Scale'
        className='text-center'
      />
    ),
    cell: ({ row }) => {
      const scale = scales.find(
        (scale) => scale.value === row.getValue('scale')
      )

      if (!scale) {
        return null
      }

      return (
        <div className='flex items-center text-center'>
          {/* {scale.icon && (
            <scale.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )} */}
          <span>{scale.label}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => <div>{row.getValue('address')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'waste_volume',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Waste Volume' />
    ),
    cell: ({ row }) => <div>{row.getValue('waste_volume')}</div>,
    enableSorting: true,
  },
  {
    id: 'actions',
    header: () => null,
    cell: ({ row }) => {
      const navigate = useNavigate()

      const handleButtonClick = () => {
        navigate(`/organizations/${row.id}`)
      }

      return (
        <div className='mr-4 text-right'>
          <Button
            variant='outline'
            size='sm'
            className='hidden h-8 text-[12px] text-primary/80 hover:text-primary lg:flex'
            onClick={handleButtonClick}
          >
            Manage
          </Button>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
