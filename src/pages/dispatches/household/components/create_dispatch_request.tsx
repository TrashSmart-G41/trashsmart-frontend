import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  // AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  region: z.string(),
  truck_id: z.string(),
  driver_id: z.string(),
  date: z.string(),
  time: z.string(),
})

export function DispatchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      region: '',
      truck_id: '',
      driver_id: '',
      date: '',
      time: '',
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
        Create new dispatch
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='region'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Region' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='small'>Small</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='large'>Large</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='truck_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Truck_ID</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select truck' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='small'>Small</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='large'>Large</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='driver_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver_ID</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select driver' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='small'>Small</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='large'>Large</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date</FormLabel>
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
                        <span>DD-MM-YYYY</span>
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
        />
        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
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