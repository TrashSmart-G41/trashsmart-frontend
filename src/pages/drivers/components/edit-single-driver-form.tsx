import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
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

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { fetchDriver, updateDriver } from '../data/services'

const firstName = z.string().nonempty({
  message: 'First name cannot be empty.',
})

const lastName = z.string().nonempty({
  message: 'Last name cannot be empty.',
})

const contactNo = z.string().regex(/^\d+$/, {
  message: 'Contact number should contain only digits.',
})

const address = z.string().nonempty({
  message: 'Address cannot be empty.',
})

const dob = z.string().nonempty({
  message: 'Date of birth cannot be empty.',
})

const nic = z.string().nonempty({
  message: 'NIC cannot be empty.',
})

const totalCollections = z.number().nullable()
const currentStreak = z.number().nullable()
const longestStreak = z.number().nullable()
const totalActiveDays = z.number().nullable()
const numberOfHolidays = z.number().nullable()

const FormSchema = z.object({
  firstName: firstName,
  lastName: lastName,
  contactNo: contactNo,
  address: address,
  dob: dob,
  nic: nic,
  totalCollections: totalCollections,
  currentStreak: currentStreak,
  longestStreak: longestStreak,
  totalActiveDays: totalActiveDays,
  numberOfHolidays: numberOfHolidays,
})

export function EditSingleDriver({ contId }: { contId: string }) {
  const [open, setOpen] = useState(false) // Add state to control the modal visibility
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      contactNo: '',
      dob: '',
      nic: '',
      totalCollections: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      numberOfHolidays: 0,
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
                dob: string
                nic: string
                totalCollections: number
                currentStreak: number
                longestStreak: number
                totalActiveDays: number
                numberOfHolidays: number
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

    // Automatically open the modal after data fetch
    setOpen(true)
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the modal immediately
    setOpen(false)
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
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
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
                name='dob'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nic'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='totalCollections'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Collections</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='currentStreak'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Streak</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='longestStreak'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longest Streak</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='totalActiveDays'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Active Days</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='numberOfHolidays'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Holidays</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <div className='items-right justify-right flex w-full gap-2'>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type='submit'>Submit</Button>
                </div>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
