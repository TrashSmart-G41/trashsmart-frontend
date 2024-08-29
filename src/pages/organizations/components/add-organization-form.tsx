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
import { request } from '@/lib/axiosHelper'
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
// import { toast } from '@/components/ui/use-toast'
import loadOrganizations from '../index'

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  contact_number: z.string()
    .regex(/^0\d{9}$/, {
      message: 'Contact number must start with 0 and be exactly 10 digits.',
    })
    .length(10, {
      message: 'Contact number must be exactly 10 digits.',
    }),
  scale: z.string().min(1, {
    message: 'Scale is required.',
  }),
  organization_type: z.string().min(1, {
    message: 'Organization type is required.',
  }),
});

export function AddOrganization() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      contact_number: '',
      scale: '',
      organization_type: '',
    },
  })

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   // toast({
  //   //   title: 'You submitted the following values:',
  //   //   description: (
  //   //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
  //   //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
  //   //     </pre>
  //   //   ),
  //   // })
  //   // document.getElementById('continue')?.click()
  //   console.log(data)
  //   const API_URL = 'api/v1/organization'
  //   const response = request('POST', API_URL, data)
  //   console.log(response)
  //   document.getElementById('continue')?.click()
  // }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    const API_URL = 'api/v1/organization'

    // Close the popup immediately
    document.getElementById('continue')?.click()

    try {
      const response = await request('POST', API_URL, data)
      if (response.status === 200) {
        window.location.reload()
        console.log('Form submitted successfully')
        // loadOrganizations();
      } else {
        console.error('Form submission failed with status:', response.status)
        // logic to handle error
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // logic to handle error
    }
  }



  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add organization
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
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
          name='contact_number'
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
          name='scale'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scale</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select input' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='SMALL'>Small</SelectItem>
                  <SelectItem value='MEDIUM'>Medium</SelectItem>
                  <SelectItem value='LARGE'>Large</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organization_type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select input' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='EDUCATION'>Educational</SelectItem>
                  <SelectItem value='HEALTH'>Health</SelectItem>
                  <SelectItem value='SOCIAL_SERVICES'>
                    Social Services
                  </SelectItem>
                  <SelectItem value='GOVERNMENT'>Government</SelectItem>
                  <SelectItem value='BUSINESS_AND_COMMERCE'>
                    Business and Commerce
                  </SelectItem>
                  <SelectItem value='TECHNOLOGY'>Technology</SelectItem>
                  <SelectItem value='ENVIRONMENT'>Environment</SelectItem>
                  <SelectItem value='ARTS_AND_CULTURE'>
                    Arts and Culture
                  </SelectItem>
                  <SelectItem value='MEDIA_AND_COMMUNICATION'>
                    Media and communication
                  </SelectItem>
                  <SelectItem value='TRANSPORTATION'>Transportation</SelectItem>
                  <SelectItem value='AGRICULTURE_AND_FOOD'>
                    Agriculture and Food
                  </SelectItem>
                  <SelectItem value='FINANCE'>Finance</SelectItem>
                  <SelectItem value='CONSTRUCTION_AND_REAL_ESTATE'>
                    Construction and Real-Estate
                  </SelectItem>
                  <SelectItem value='TOURISM_AND_HOSPITALITY'>
                    Tourism and Hospitality
                  </SelectItem>
                  <SelectItem value='ENERGY'>Energy</SelectItem>
                </SelectContent>
              </Select>
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
