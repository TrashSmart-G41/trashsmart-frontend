import { CleanerForm } from '@/pages/cleaners/components/add-cleaner-form'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
// import { DataTableViewOptions } from '../components/data-table-view-options'

import { statuses, types } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { useState } from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value
    setSearchValue(value)

    // Clear both filters before setting the new value
    table.getColumn('request_id')?.setFilterValue(undefined)
    table.getColumn('date')?.setFilterValue(undefined)

    // Determine if the value is a valid date format (YYYY-MM-DD)
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(value)

    if (isDate) {
      table.getColumn('date')?.setFilterValue(value)
    } else {
      table.getColumn('request_id')?.setFilterValue(value)
    }
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Search by request ID or date...'
          value={searchValue}
          onChange={handleChange}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('type') && (
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title='Type'
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
      <CleanerForm />
    </div>
  )
}
