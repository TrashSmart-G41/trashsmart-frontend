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
import { Separator } from '@/components/ui/separator'
// import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { addDispatch } from '../data/services.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FormSchema = z.object({
  wasteType: z.string().nonempty({ message: 'Waste Type is required' }),
})

export function DispatchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wasteType: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const createdispatch = async () => {
        const response = await addDispatch(data)
        if (response.status === 200) {
          console.log('Bin added successfully!')
          // window.location.reload()
        } else {
          console.error('Failed to add dispatch:')
        }
      }
      createdispatch()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        New Dispatch Request
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
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
        <Separator />
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
