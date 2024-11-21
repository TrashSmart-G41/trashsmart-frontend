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
// import { request } from '@/lib/axiosHelper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
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
import { addRecyclingPlant } from '../data/services'
// import { useNavigate } from 'react-router-dom'
// import { toast } from '@/components/ui/use-toast'

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
  brn: z.string().min(3, {
    message: 'Recycling Plant BRN is required.',
  }),
})

export function AddRecyclingPlant() {
  // let desc: string = ""
  // const navigate = useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      contactNo: '',
      profileURL: '',
      brn: '',
    },
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the popup immediately
    document.getElementById('continue')?.click()
    try {
      const addPlant = async () => {
        const response = await addRecyclingPlant(data)
        if (response.status === 200) {
          // desc = 'Plant added successfully!'
          window.location.reload()
        }
      }
      addPlant()
    } catch (error) {
      // console.error(error)
      // desc = 'Error adding organization!'
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add Recycling Plant
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
          name='brn'
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
  )
}
