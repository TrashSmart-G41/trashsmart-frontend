import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
//import { DataTableRowActions } from './data-table-row-actions'

// import { statuses } from '../data/data'
import { Driver } from '../data/schema'
import { Button } from '@/components/custom/button'
import { DeleteDriver } from './delete-driver.tsx'
import { EditDriver } from './edit-driver-form.tsx'
//import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Driver>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Employee Id'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Full Name"
        className="text-center text-[14px]"
      />
    ),
    cell: ({ row }) => {
      const fullName = row.getValue('fullName') as string; // Cast to string
      return (
        <div className="flex items-center space-x-2">
          {fullName}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'contactNo',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Contact Number'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('contactNo')}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  // {
  //   accessorKey: 'region',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       className='text-[14px]'
  //       column={column}
  //       title='Region'
  //     />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('region')}</div>,
  //   // enableSorting: true,
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
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
      const fillColor =
        status === 'active'
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
      const contId = String(row.getValue('id') || '').slice(-3)
      const handleButtonClick = () => {
        navigate(`/drivers/${row.getValue('id')}`)
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
          {/* Remove the DataTableRowActions to get rid of the three dots menu */}
          {/* <DataTableRowActions row={row} /> */}
          <EditDriver contId={contId} />
          <DeleteDriver contId={contId} />
        </div>
      )
    },
  },  
]
