import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { useEffect } from 'react'
import {
  fetchMaintenanceRequest,
  updateMaintenanceRequest,
} from '../data/services'

const FormSchema = z.object({
  requestStatus: z.string(),
  otherNotes: z.string(),
})

export function EditReq({ contId }: { contId: string }) {
  // let desc: string = ''
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      requestStatus: '',
      otherNotes: '',
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('contId:', contId)
        fetchMaintenanceRequest(contId)
          .then((data) => {
            return form.reset(
              data as {
                requestStatus: string
              }
            )
          })
          .catch((error) => {
            console.error('Error fetching request data:', error)
          })
      } catch (error) {
        console.error('Error fetching request data:', error)
      }
    }

    fetchData()
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const editReq = async () => {
        const response = await updateMaintenanceRequest(contId.slice(-3), data)
        if (response.status === 200) {
          window.location.reload()
        }
      }
      editReq()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 px-2 text-[12px] text-primary/80 hover:text-primary'
          >
            Edit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <h2 className='w-full text-center text-lg font-semibold'>
              Edit Request Status
            </h2>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='requestStatus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select input' {...field} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='TO_DO'>To-do</SelectItem>
                        <SelectItem value='COMPLETED'>Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='otherNotes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Comment</FormLabel>
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
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
