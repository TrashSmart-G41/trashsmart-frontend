import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { assignCleaner } from '../data/services'
import { fetchCleaners } from '@/pages/cleaners/data/services'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Cleaner } from '@/pages/cleaners/data/schema'

const FormSchema = z.object({
  cleaner_id: z.string().nonempty('Please select a cleaner.'),
})

export function AssignBin({ contId }: { contId: string }) {
  const [cleaners, setCleaners] = useState<Cleaner[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load cleaners on component mount
  useEffect(() => {
    const loadCleaners = async () => {
      try {
        const data = await fetchCleaners()
        // @ts-ignore
        const mappedData: Cleaner[] = data.map((cleaner: any) => ({
          id: cleaner.id,
          firstName: cleaner.firstName,
        }))
        setCleaners(mappedData)
      } catch (err) {
        console.error('Failed to load cleaners:', err)
        setError('Could not fetch cleaners. Please try again.')
      }
    }
    loadCleaners()
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cleaner_id: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await assignCleaner(data, contId)
      if (response.status === 200) {
        console.log('Assigned successfully!')
        window.location.reload()
      } else {
        throw new Error('Assignment failed. Please try again.')
      }
    } catch (err) {
      console.error('Error assigning cleaner:', err)
      setError('Failed to assign cleaner. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>Assign Cleaner to Bin</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            name='cleaner_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Cleaner</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Cleaner' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cleaners.map((cleaner) => (
                      <SelectItem key={cleaner.id} value={cleaner.id}>
                        {cleaner.firstName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <DialogFooter className='flex items-center justify-end gap-2'>
            <Button type='button' variant='ghost' onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Assigning...' : 'Assign'}
            </Button>
          </DialogFooter>
        </form>
        {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
      </Form>
    </Dialog>
  )
}
