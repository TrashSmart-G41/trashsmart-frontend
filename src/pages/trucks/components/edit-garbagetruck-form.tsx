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
import { fetchGarbageTruck, updateGarbageTruck } from '../data/services'

const sriLankanLicensePlateSchema = z
  .string()
  .regex(/^(?:[A-Z0-9]{1,3}-\d{4})$/, {
    message:
      'License plate must follow the Sri Lankan format, e.g., 123-4567, AB-1234, or ABC-1234.',
  })

const maxCapacitySchema = z.string().refine(
  (value) => {
    const num = parseFloat(value)
    return num > 0
  },
  {
    message: 'Max capacity must be greater than zero.',
  }
)

const mileageSchema = z.string().refine(
  (value) => {
    const num = parseFloat(value)
    return num >= 0
  },
  {
    message: 'Mileage cannot be negative.',
  }
)

const FormSchema = z.object({
  licencePlateNo: sriLankanLicensePlateSchema,
  maxVolume: maxCapacitySchema,
  mileage: mileageSchema,
})

export function EditGarbageTruck({ contId }: { contId: string }) {
  // let desc: string = ''
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      licencePlateNo: '',
      maxVolume: '',
      mileage: '',
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('contId:', contId)
        fetchGarbageTruck(contId)
          .then((data) => {
            return form.reset(
              data as {
                licencePlateNo: string
                maxVolume: string
                mileage: string
              }
            )
          })
          .catch((error) => {
            console.error('Error fetching garbage truck data:', error)
          })
      } catch (error) {
        console.error('Error fetching garbage truck data:', error)
      }
    }

    fetchData()
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    // Close the popup immediately
    document.getElementById('continue')?.click()
    try {
      const editgarbagetruck = async () => {
        const response = await updateGarbageTruck(contId.slice(-3), data)
        if (response.status === 200) {
          // desc = 'Organization added successfully!'
          window.location.reload()
        }
      }
      editgarbagetruck()
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
              Edit Garbage Truck
            </h2>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='licencePlateNo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Garbage truck vehicle reg. no.</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='maxVolume'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Volume</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='mileage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage</FormLabel>
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
