import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { addCommercialBin } from '../data/services.tsx'
// import { fetchOrganizations } from '@/pages/organizations/data/services.tsx'
// import { useEffect, useState } from 'react'
// import DragableMarker from '@/components/custom/dragablemarker'
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

// const longitude = z
//   .string()
//   .refine((value) => {
//     const num = parseFloat(value)
//     return !isNaN(num)
//   })
//   .transform((value) => parseFloat(value))

// const latitude = z
//   .string()
//   .refine((value) => {
//     const num = parseFloat(value)
//     return !isNaN(num)
//   })
//   .transform((value) => parseFloat(value))

const FormSchema = z.object({
  wasteType: z.string(),
  binSize: z.string(),
  API_KEY: z.string(),
})

// interface Organization {
//   org_id: string
//   firstName: string
// }

export function CommercialBinForm() {
  // const [organizations, setOrganizations] = useState<Organization[]>([])

  // useEffect(() => {
  //   const loadOrganizations = async () => {
  //     try {
  //       const data: any = await fetchOrganizations()
  //       const mappedData: Organization[] = data.map((organization: any) => ({
  //         org_id: organization.id,
  //         firstName: organization.firstName,
  //       }))
  //       setOrganizations(mappedData)
  //     } catch (error) {
  //       console.error('Failed to load organizations:', error)
  //     }
  //   }
  //   loadOrganizations()
  // }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wasteType: '',
      binSize: '',
      API_KEY: '',
    },
  })

  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const addcommercialbin = async () => {
        const response = await addCommercialBin(data)
        if (response.status === 200) {
          console.log('Bin added successfully!')
          window.location.reload()
        }
      }
      addcommercialbin()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form {...form}>
      <h2 className='w-full text-center text-lg font-semibold'>
        Add Commercial Bin
      </h2>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='w-full space-y-6'
      >
        <FormField
          control={form.control}
          name='wasteType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Waste Type' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='BIO_DEGRADABLE'>Bio-degradable</SelectItem>
                  <SelectItem value='NON_BIO_DEGRADABLE'>
                    Non Bio-degradable
                  </SelectItem>
                  <SelectItem value='RECYCLABLE'>Recyclable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='binSize'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bin Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Bin Size' {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='GENERAL'>General</SelectItem>
                  <SelectItem value='MEDIUM'>Medium</SelectItem>
                  <SelectItem value='MEGA'>Mega</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='API_KEY'
          render={({ field }) => (
            <FormItem>
              <FormLabel>API KEY</FormLabel>
              <FormControl>
                <Input
                  // id='lat_pos'
                  placeholder='Enter API KEY'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        <AlertDialogFooter>
          <div className='flex w-full items-center justify-center gap-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button type='submit'>Add</Button>

            <AlertDialogAction className='hidden' id='continue'>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
