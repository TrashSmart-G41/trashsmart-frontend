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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
//import { toast } from '@/components/ui/use-toast'
import { addGarbageTruck } from '../data/services'

const sriLankanLicensePlateSchema = z
  .string()
  .regex(/^(?:[A-Z0-9]{1,3}-\d{4})$/, {
    message:
      'License plate must follow the Sri Lankan format, e.g., 123-4567, AB-1234, or ABC-1234.',
  })

const maxCapacitySchema = z.string().refine(
  (value) => {
    const num = parseFloat(value)
    return num > 0
  },
  {
    message: 'Max capacity must be greater than zero.',
  }
)

const mileageSchema = z.string().refine(
  (value) => {
    const num = parseFloat(value)
    return num >= 0
  },
  {
    message: 'Mileage cannot be negative.',
  }
)

const FormSchema = z.object({
  licencePlateNo: sriLankanLicensePlateSchema,
  maxVolume: maxCapacitySchema,
  mileage: mileageSchema,
})

export function AddTruckForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      licencePlateNo: '',
      mileage: '',
      maxVolume: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the popup immediately
    document.getElementById('continue')?.click()
    try {
      const addgarbagetruck = async () => {
        const response = await addGarbageTruck(data)
        if (response.status === 200) {
          // desc = 'Organization added successfully!'
          window.location.reload()
        }
      }
      addgarbagetruck()
    } catch (error) {
      // console.error(error)
      // desc = 'Error adding organization!'
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add new truck
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='licencePlateNo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Licence Plate Number</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter the licence plate number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mileage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mileage</FormLabel>
              <FormControl>
                <Input placeholder='Enter truck mileage' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='maxVolume'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Capacity</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormDescription>
                Enter the maximum garbage capacity the truck can carry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <div className='flex w-full items-center justify-center gap-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type='submit'>Submit</Button>
            <AlertDialogAction className='hidden' id='continue'>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
