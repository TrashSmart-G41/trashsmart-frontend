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

// import { CalendarIcon } from 'lucide-react'
// import { format } from 'date-fns'
// import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
// import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
// import { toast } from '@/components/ui/use-toast'
import { addCommunalBin } from '../data/services.tsx'
// import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const longitude = z
  .string()
  .refine((value) => {
    const num = parseFloat(value)
    return !isNaN(num)
  })
  .transform((value) => parseFloat(value)) // Transform to number

const latitude = z
  .string()
  .refine((value) => {
    const num = parseFloat(value)
    return !isNaN(num)
  })
  .transform((value) => parseFloat(value))
  
const FormSchema = z.object({
  longitude: longitude,
  latitude: latitude,
  wasteType: z.string(),
  binSize: z.string(),
  //installation_date: z.string(),
})

export function AddCommunalBinForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      longitude: 0.0,
      latitude: 0.0,
      wasteType: '',
      binSize: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const addcommunalbin = async () => {
        const response = await addCommunalBin(data)
        if (response.status === 200) {
          console.log('Bin added successfully!')
          window.location.reload()
        }
      }
      addcommunalbin()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add Communal Bin
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        {/* <FormField
          control={form.control}
          name='bin_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bin ID</FormLabel>
              <FormControl>
                <Input placeholder='Default' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name='longitude'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Longitude)</FormLabel>
              <FormControl>
                <Input placeholder='Enter location longitude' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='latitude'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Latitude)</FormLabel>
              <FormControl>
                <Input placeholder='Enter location latitude' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='wasteType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Waste Type' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='BIO_DEGRADABLE'>Bio-degradable</SelectItem>
                  <SelectItem value='NON_BIO_DEGRADABLE'>
                    Non Bio-degradable
                  </SelectItem>
                  <SelectItem value='RECYCLABLE'>Recyclable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='binSize'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bin Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Bin Size' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='GENERAL'>General</SelectItem>
                  <SelectItem value='MEDIUM'>Medium</SelectItem>
                  <SelectItem value='MEGA'>Mega</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='installation_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Installation Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span></span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    // selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Separator />
        {/* <Button
          className='bg-white text-gray-500 hover:bg-gray-100'
          type='submit'
        >
          + Add another
        </Button> */}

        <AlertDialogFooter>
          <div className='flex w-full items-center justify-center gap-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button type='submit'>Add</Button>

            <AlertDialogAction className='hidden' id='continue'>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
