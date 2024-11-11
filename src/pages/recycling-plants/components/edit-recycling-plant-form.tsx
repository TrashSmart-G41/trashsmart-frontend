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
import { fetchRecyclingPlant, updateRecyclingPlant } from '../data/services'

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Recycling Plant name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: "Contact person's name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  contactNo: z
    .string()
    .regex(/^0\d{9}$/, {
      message: 'Contact number must start with 0 and be exactly 10 digits.',
    })
    .length(10, {
      message: 'Contact number must be exactly 10 digits.',
    }),
  profileURL: z.string().min(1, {
    message: 'ProfileURL is required.',
  }),
  BRN: z.string().min(3, {
    message: 'Recycling Plant BRN is required.',
  }),
})

export function EditRecyclingPlant({ contId }: { contId: string }) {
  // let desc: string = ''
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      contactNo: '',
      profileURL: '',
      BRN: '',
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('contId:', contId)
        fetchRecyclingPlant(contId)
          .then((data) => {
            return form.reset(
              data as {
                firstName: string
                lastName: string
                email: string
                address: string
                contactNo: string
                prfileURL: string
                BRN: string
              }
            )
          })
          .catch((error) => {
            console.error('Error fetching Recycling Plant data:', error)
          })
      } catch (error) {
        console.error('Error fetching Recycling Plant data:', error)
      }
    }

    fetchData()
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the popup immediately
    document.getElementById('continue')?.click()
    try {
      const editPlant = async () => {
        const response = await updateRecyclingPlant(contId.slice(-3), data)
        if (response.status === 200) {
          // desc = 'Organization added successfully!'
          window.location.reload()
        }
      }
      editPlant()
    } catch (error) {
      // console.error(error)
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
              Edit Recycling Plant
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
                    <FormLabel>Recycling Plant Name</FormLabel>
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
                    <FormLabel>Contact Person's Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
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
                name='profileURL'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile URL</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='BRN'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Registration No.</FormLabel>
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
