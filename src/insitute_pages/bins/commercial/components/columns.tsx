import { ColumnDef } from '@tanstack/react-table'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'

// import { statuses, regions } from '../data/data'
import { CommercialBin } from '../data/schema'
import { CommercialDialog } from './commercial_bin_dialog'
import { Button } from '@/components/custom/button'
import { useEffect, useState } from 'react'
import { sendWCR } from '../data/services'
// import { Button } from '@/components/custom/button'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<CommercialBin>[] = [
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
        title='Bin ID'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('bin_id')}</div>,
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
    accessorKey: 'purchased_date',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-[14px]'
        column={column}
        title='Purchased Date'
      />
    ),
    cell: ({ row }) => <div>{row.getValue('purchased_date')}</div>,
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
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const binId = String(row.getValue('bin_id') || '').slice(-3)
      console.log(binId)

      const [isRequestSent, setIsRequestSent] = useState(false)

      useEffect(() => {
        // Check local storage on component mount
        const sentRequests = JSON.parse(
          localStorage.getItem('sentRequests') || '{}'
        )
        if (sentRequests[binId]) {
          setIsRequestSent(true)
        }
      }, [binId])

      const handleSendRequest = async () => {
        try {
          const response = await sendWCR(binId)
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Failed to send waste collection request')
          }
          console.log(`Waste collection request sent for Bin ID: ${binId}`)
          setIsRequestSent(true)

          // Save state in local storage
          const sentRequests = JSON.parse(
            localStorage.getItem('sentRequests') || '{}'
          )
          sentRequests[binId] = true
          localStorage.setItem('sentRequests', JSON.stringify(sentRequests))
        } catch (error) {
          console.error('Error sending waste collection request:', error)
        }
      }

      return (
        <div className='mr-4 flex items-center justify-end space-x-2'>
          <CommercialDialog binId={binId} />
          <Button
            variant='ghost'
            className={`flex h-8 px-2 text-[12px] ${
              isRequestSent
                ? 'cursor-not-allowed text-gray-500'
                : 'text-primary/80 hover:text-primary'
            }`}
            onClick={handleSendRequest}
            disabled={isRequestSent}
          >
            {isRequestSent ? 'Requested' : 'Request'}
          </Button>
        </div>
      )
    },
  },
]
