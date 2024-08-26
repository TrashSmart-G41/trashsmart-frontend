import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Organization } from '../data/schema'
import { Button } from '@/components/custom/button'

export const columns: ColumnDef<Organization>[] = [
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
        title='ID'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Name'
        className='text-center text-[14px]'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('firstName')}</div>,
    enableSorting: true,
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
    enableSorting: false,
    // enableHiding: false,
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
    // enableSorting: true,
  },
  {
    accessorKey: 'totalWaste',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Waste Volume'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('totalWaste')}</div>,
    // enableSorting: true,
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
        navigate(`/organizations/${row.getValue('id')}`)
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
