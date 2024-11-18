import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
// import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
//import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { Organization } from '../org/data/schema'
import { Button } from '@/components/custom/button'
import { EditOrganization } from '/Users/mashawickramasinghe/Desktop/UCSC/3rd Year/Group Project 2/trashsmart-frontend/src/pages/organizations/components/edit-organization-form.tsx'
import { DeleteOrganization } from '/Users/mashawickramasinghe/Desktop/UCSC/3rd Year/Group Project 2/trashsmart-frontend/src/pages/organizations/components/delete-organization.tsx'

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Organization ID'
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
  {
    id: 'actions',
    cell: ({ row }) => {
      const navigate = useNavigate()
      const contId = String(row.getValue('id') || '').slice(-3)
  
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
          {/* <DataTableRowActions row={row} /> */}
          <EditOrganization contId={contId} />
          <DeleteOrganization contId={contId} />
        </div>
      )
    },
  },
  
]
