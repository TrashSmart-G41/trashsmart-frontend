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
import { Input } from '@/components/ui/input'
import { jwtDecode, JwtPayload } from 'jwt-decode'


const FormSchema = z.object({
  apiKey: z.string(),
})

const token = localStorage.getItem('token') ?? ''
const decodeToken = jwtDecode<JwtPayload>(token) as { userId: string }
const contId = decodeToken?.userId

export function CommercialBinForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apiKey: '',
    },
  })

  async function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const addcommercialbin = async () => {
        const response = await addCommercialBin(contId, data.apiKey)
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
          name='apiKey'
          render={({ field }) => (
            <FormItem>
              <FormLabel>API KEY</FormLabel>
              <FormControl>
                <Input placeholder='Enter API KEY' {...field} />
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
