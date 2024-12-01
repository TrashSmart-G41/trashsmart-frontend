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

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { fetchDriver, updateDriver } from '../data/services'
//import { parseArgs } from 'util'

const firstName = z.string().nonempty({
  message: 'First name cannot be empty.',
})

const lastName = z.string().nonempty({
  message: 'Last name cannot be empty.',
})

const contactNo = z.string().regex(/^\d+$/, {
  message: 'Contact number should contain only digits.',
})

const status = z
  .string()
  .refine((value) => value === 'ACTIVE' || value === 'UNAVAILABLE', {
    message: 'Status must be either "active" or "unavailable".',
  })

const FormSchema = z.object({
  firstName: firstName,
  lastName: lastName,
  status: status,
  contactNo: contactNo,
})

export function EditDriver({ contId }: { contId: string }) {
  // let desc: string = ''
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      status: '',
      contactNo: '',
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('contId:', contId)
        fetchDriver(contId)
          .then((data) => {
            return form.reset(
              data as {
                firstName: string
                lastName: string
                status: string
                contactNo: string
              }
            )
          })
          .catch((error) => {
            console.error('Error fetching garbage driver data:', error)
          })
      } catch (error) {
        console.error('Error fetching garbage driver data:', error)
      }
    }

    fetchData()
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the popup immediately
    document.getElementById('continue')?.click()
    try {
      const editdriver = async () => {
        const response = await updateDriver(contId.slice(-3), data)
        if (response.status === 200) {
          console.log('driver updated')
          window.location.reload()
        }
      }
      editdriver()
    } catch (error) {
      console.error(error)
      // desc = 'Error adding organization!'
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
              Edit Driver
            </h2>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contactNo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <div className='items-right justify-right flex w-full gap-2'>
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
