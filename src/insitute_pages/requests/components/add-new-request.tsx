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

const token = localStorage.getItem('token') ?? ''
const decodeToken = jwtDecode<JwtPayload>(token) as { userId: number }
const contId = decodeToken?.userId
console.log(contId)

const FormSchema = z.object({
  wasteType: z.string().min(1, { message: 'Waste Type is required.' }),
  accumulatedVolume: z.preprocess(
    (value) => Number(value),
    z.number().min(1, { message: 'Volume is required and must be at least 1.' })
  ),
})

export function AddRequest() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wasteType: '',
      accumulatedVolume: 0,
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
          console.log(response)
          // window.location.reload()
        }
      }

      addReq()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>Add Request</h2>
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
                  <SelectItem value='BIO_DEGRADABLE'>Bio_Degradable</SelectItem>
                  <SelectItem value='NON_BIO_DEGRADABLE'>
                    Non_Bio_Degradable
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
          name='accumulatedVolume'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Volume</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter waste volume'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
