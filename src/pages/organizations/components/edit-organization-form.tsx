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
import { fetchOrganization, updateOrganization } from '../data/services'

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Organization name must be at least 2 characters.',
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
  scale: z.string().min(1, {
    message: 'Scale is required.',
  }),
  orgType: z.string().min(1, {
    message: 'Organization type is required.',
  }),
})

export function EditOrganization({ contId }: { contId: string }) {
  // let desc: string = ''
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      contactNo: '',
      scale: '',
      orgType: '',
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('contId:', contId)
        fetchOrganization(contId)
          .then((data) => {
            return form.reset(
              data as {
                firstName: string
                lastName: string
                email: string
                address: string
                contactNo: string
                scale: string
                orgType: string
              }
            )
          })
          .catch((error) => {
            console.error('Error fetching organization data:', error)
          })
      } catch (error) {
        console.error('Error fetching organization data:', error)
      }
    }

    fetchData()
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the popup immediately
    document.getElementById('continue')?.click()
    try {
      const editOrg = async () => {
        const response = await updateOrganization(contId.slice(-3), data)
        if (response.status === 200) {
          // desc = 'Organization added successfully!'
          window.location.reload()
        }
      }
      editOrg()
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
              Edit Organization
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
                    <FormLabel>Organization Name</FormLabel>
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
                name='scale'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scale</FormLabel>
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
                name='orgType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Type</FormLabel>
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
                        <SelectItem value='TRANSPORTATION'>
                          Transportation
                        </SelectItem>
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
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
