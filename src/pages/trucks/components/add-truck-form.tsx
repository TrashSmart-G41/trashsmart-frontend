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
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  licence_plate_no: z.string(),
  max_capacity: z.string(),
  mileage: z.string(),
})

export function AddTruckForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      licence_plate_no: '',
      mileage: '',
      max_capacity: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    document.getElementById('continue')?.click()
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add new truck
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='licence_plate_no'
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
          name='max_capacity'
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
