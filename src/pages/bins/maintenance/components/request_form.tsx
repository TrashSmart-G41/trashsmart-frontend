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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  bin_id: z.string(),
  reason: z.string(),
})

export function RequestForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bin_id: '',
      reason: '',
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
          name='reason'
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
