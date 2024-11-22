import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  // AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  // AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  // AlertDialogHeader,
  // AlertDialogTitle,
  // AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { addMaintenanceRequest } from '../data/services.tsx'
import { fetchCommercialBins } from '@/pages/bins/commercial/data/services.tsx'
import { fetchCommunalBins } from '@/pages/bins/communal/data/services.tsx'
import { useEffect, useState } from 'react'
import { CommercialBin } from '../../commercial/data/schema.ts'
//import { CommunalBin } from '../../communal/data/schema.ts'

const FormSchema = z.object({
  bin_id: z.string(),
  otherNotes: z.string(),
})

export function RequestForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bin_id: '',
      otherNotes: '',
    },
  })

  const [bins, setBins] = useState<CommercialBin[]>([])

  useEffect(() => {
    const loadBins = async () => {
      try {
        // Fetch commercial bins
        const commercialData: any = await fetchCommercialBins()
        const commercialMapped: CommercialBin[] = commercialData.map(
          (bin: any) => ({
            bin_id: `SB-${bin.id.toString().padStart(3, '0')}`,
          })
        )

        // Fetch communal bins
        const communalData: any = await fetchCommunalBins()
        const communalMapped: CommercialBin[] = communalData.map(
          (bin: any) => ({
            bin_id: `SB-${bin.id.toString().padStart(3, '0')}`,
          })
        )

        setBins([...commercialMapped, ...communalMapped])
      } catch (error) {
        console.error('Failed to load bins:', error)
      }
    }
    loadBins()
  }, [])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    document.getElementById('continue')?.click()
    try {
      const binId = data.bin_id.slice(-3)
      console.log(binId)
      const addrequest = async () => {
        const response = await addMaintenanceRequest(data, binId)
        if (response.status === 200) {
          console.log('Request added successfully!')
          window.location.reload()
        }
      }
      addrequest()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        New Maintenance Request
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='bin_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bin ID</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Bin' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bins.map((bin) => (
                    <SelectItem key={bin.bin_id} value={bin.bin_id}>
                      {bin.bin_id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='otherNotes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder='Enter reason for maintenance' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <div className='flex w-full items-center justify-center gap-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type='submit'>Create</Button>
            <AlertDialogAction className='hidden' id='continue'>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
