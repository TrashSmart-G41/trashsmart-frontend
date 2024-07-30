// import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
// import { Input } from '@/components/ui/input'
// import { DataTableViewOptions } from '../components/data-table-view-options'

// import { scales } from '../org/data/data'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'
// import { AddOrganization } from './add-organization-form'
// import { PopupForm } from '@/components/custom/popupform'
import { useNavigate } from 'react-router-dom'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>(
  {
    // table,
  }: DataTableToolbarProps<TData>
) {
  // const isFiltered = table.getState().columnFilters.length > 0
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/organizations')
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <div>
          <div>
            <h2 className='text-xl font-semibold text-muted-foreground '>
              Organizations
            </h2>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>16 in total</p>
          </div>
        </div>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
      {/* <AddOrganization /> */}
      {/* <PopupForm
        formContent={AddOrganization}
        buttonContent={'+ Add Organization'}
      /> */}
      <Button
        variant='outline'
        className='h-8 px-2 lg:px-3'
        onClick={handleClick}
      >
        View All
      </Button>
    </div>
  )
}
