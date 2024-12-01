import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { CommunalBin } from '../data/schema'
import { CommunalDialog } from './communal_bin_dialog'
import { EditBin } from './edit-bin-form'
import { AssignBin } from './assign-bin-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

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
    cell: ({ row }) => <div>{row.getValue('location')}</div>,
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
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
    // enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'installed_date',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Installation Date'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('installed_date')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
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
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Status'
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const textColor = status === 'Full' ? 'text-destructive' : ''

      return <div className={textColor}>{status}</div>
    },
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const binId = String(row.getValue('bin_id') || '').slice(-3);
      const fillLevel = row.getValue('fill_level') as number;
      console.log(binId);
  
      return (
        <div className='mr-4 flex items-center justify-end'>
          <CommunalDialog binId={binId} />
          <EditBin contId={binId} />
          {fillLevel > 75 && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="ml-4 px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                Assign
              </button>
            </DialogTrigger>
            <DialogContent>
              <AssignBin contId={binId} />
            </DialogContent>
          </Dialog>
        )}
        </div>
      );
    },
  },   
]
