import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { addRequest } from '../data/services'
import { jwtDecode, JwtPayload } from 'jwt-decode'

// const isDateInPast = (date: string) => new Date(date) < new Date()

const token = localStorage.getItem('token') ?? ''
const decodeToken = jwtDecode<JwtPayload>(token) as { userId: string }
const contId = decodeToken?.userId

const FormSchema = z
  .object({
    wasteType: z.string().min(1, { message: 'Waste Type is required.' }),
    accumulatedVolume: z.string().min(1, { message: 'Volume is required.' }),
    // datetime: z.string().min(1, { message: ' is required.' }),
    })
  // .refine((data) => !isDateInPast(data.datetime), {
  //   message: 'Date cannot be in the past.',
  //   path: ['datetime'],
  // })

export function AddRequest() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wasteType: '',
      accumulatedVolume: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    document.getElementById('continue')?.click()
    try {
      const addReq = async () => {
        const response = await addRequest(contId, data)
        if (response.status === 200) {
          toast({
            description: 'Waste Collecting Request added successfully.',
          })
          window.location.reload()
        }
      }

      addReq()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>Add Auction</h2>
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
                    <SelectValue placeholder='Select waste type' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='BIO-DEGRADABLE'>Bio-Degradable</SelectItem>
                  <SelectItem value='NON-BIO-DEGRADABLE'>Non Bio Degradable</SelectItem>
                  <SelectItem value='RECYCLABLE'>Recyclable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='accumulatedVolume'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Volume</FormLabel>
              <FormControl>
                <Input placeholder='Enter waste volume' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Start Date</FormLabel>
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
        {/* <FormField
          control={form.control}
          name='datetime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date and Time</FormLabel>
              <FormControl>
                <Input placeholder='Enter date and time' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Separator />

        <AlertDialogFooter>
          <div className='flex w-full items-center justify-center gap-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type='submit'>Submit Request</Button>
            <AlertDialogAction className='hidden' id='continue'>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
