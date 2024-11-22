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
import { addCommercialBin } from '../data/services.tsx'
import { fetchOrganizations } from '@/pages/organizations/data/services.tsx'
import { useEffect, useState } from 'react'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

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
  //bin_id: z.string(),
  longitude: longitude,
  latitude: latitude,
  wasteType: z.string(),
  binSize: z.string(),
  organization_id: z.string(),
  //purchase_date: z.string(),
})

interface Organization {
  org_id: string
  firstName: string
}

export function CommercialBinForm() {
  const [organizations, setOrganizations] = useState<Organization[]>([])

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const data: any = await fetchOrganizations()
        const mappedData: Organization[] = data.map((organization: any) => ({
          org_id: organization.id,
          firstName: organization.firstName,
        }))
        setOrganizations(mappedData)
      } catch (error) {
        console.error('Failed to load organizations:', error)
      }
    }
    loadOrganizations()
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //bin_id: '',
      longitude: 0.0,
      latitude: 0.0,
      wasteType: '',
      binSize: '',
      organization_id: '',
      //purchase_date: '',
    },
  })

  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const organizationId = data.organization_id
      console.log(organizationId)
      const addcommercialbin = async () => {
        const response = await addCommercialBin(data, organizationId)
        if (response.status === 200) {
          console.log('Bin added successfully!')
          window.location.reload()
        }
      }
      addcommercialbin()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add Commercial Bin
      </h2>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='w-full space-y-6'
      >
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
          name='organization_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Organization' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.org_id} value={org.org_id}>
                      {' '}
                      {/* Use org_id as the value */}
                      {org.firstName}
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
          name='purchase_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Purchase Date</FormLabel>
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
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Choose</span>
                      )}
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
