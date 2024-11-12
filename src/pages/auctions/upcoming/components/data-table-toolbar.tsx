import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
// import { DataTableViewOptions } from '../components/data-table-view-options'

import { statuses, types } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { PopupForm } from '@/components/custom/popupform'
import { AddAuctionForm } from './add_auction_form'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Search by waste type...'
          value={(table.getColumn('wasteType')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('wasteType')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('wasteType') && (
            <DataTableFacetedFilter
              column={table.getColumn('wasteType')}
              title='Waste Type'
              options={statuses}
            />
          )}
          {table.getColumn('startDate') && (
            <DataTableFacetedFilter
              column={table.getColumn('startDate')}
              title='Start Date'
              options={types}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
      <PopupForm formContent={AddAuctionForm} buttonContent={'+ Add Auction'} />
    </div>
  )
}
