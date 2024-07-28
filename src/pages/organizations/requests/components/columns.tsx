import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Cleaner } from '../data/schema'
import { Button } from '@/components/custom/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Cleaner>[] = [
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
    accessorKey: 'employee_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee Id' />
    ),
    cell: ({ row }) => <div>{row.getValue('employee_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'full_name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Full Name'
        className='text-center'
      />
    ),
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const fullName = row.getValue('full_name')
      const fallbackInitials = fullName
        ? fullName.slice(0, 2).toUpperCase()
        : 'CN'

      return (
        <div className='flex items-center space-x-2'>
          {/* avatar */}
          <Avatar className='mr-2 h-7 w-7'>
            <AvatarImage
              src='https://github.com/shadcn.png'
              alt={`@${fullName}`}
            />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>
          {fullName}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'contact_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contact Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('contact_number')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'region',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Region' />
    ),
    cell: ({ row }) => <div>{row.getValue('region')}</div>,
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className='flex'>
        {/* <DataTableColumnHeader column={column} title='Status' /> */}
        <DataTableColumnHeader column={column} title='Status' />
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')
      const fillColor =
        status === 'Active'
          ? 'bg-[#ccfbf1] text-[#115E59] dark:bg-[#0f766e] dark:text-[#ccfbf1]'
          : 'bg-[#fde2e1] text-[#981b1b] dark:bg-[#7f1d1d] dark:text-[#fde2e1]'

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
        navigate(`/cleaners/${row.getValue('employee_id')}`)
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
