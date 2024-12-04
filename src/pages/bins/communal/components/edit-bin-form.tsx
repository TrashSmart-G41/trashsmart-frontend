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
import { fetchCommunalBin, updateCommunalBin } from '../data/services'
import DragableMarker from '@/components/custom/dragablemarker'

const FormSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  wasteType: z.string(),
})

export function EditBin({ contId }: { contId: string }) {
  // let desc: string = ''
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      longitude: 0.0,
      latitude: 0.0,
      wasteType: '',
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('contId:', contId)
        fetchCommunalBin(contId)
          .then((data) => {
            return form.reset(
              data as {
                longitude: number
                latitude: number
                wasteType: string
              }
            )
          })
          .catch((error) => {
            console.error('Error fetching bin data:', error)
          })
      } catch (error) {
        console.error('Error fetching bin data:', error)
      }
    }

    fetchData()
  }, [contId, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    document.getElementById('continue')?.click()
    try {
      const editBin = async () => {
        const response = await updateCommunalBin(contId.slice(-3), data)
        if (response.status === 200) {
          window.location.reload()
        }
      }
      editBin()
    } catch (error) {
      console.error(error)
      // desc = 'Error adding organization!'
    }
  }

  const handlePositionChange = (lat: number, lng: number) => {
    console.log(`Latitude = ${lat}, Longitude = ${lng}`)
    form.setValue('latitude', lat)
    form.setValue('longitude', lng)
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
              Edit Communal Bin
            </h2>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='longitude'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location's Longitude</FormLabel>
                    <FormControl>
                      <Input
                        id='long_pos'
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
                name='latitude'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location's Latitude</FormLabel>
                    <FormControl>
                      <Input
                        id='lat_pos'
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
              <div style={{ height: '200px' }}>
                {/* <DragableMarker height='200px' /> */}
                <DragableMarker
                  height='200px'
                  onPositionChange={handlePositionChange}
                />
              </div>
              <FormField
                control={form.control}
                name='wasteType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waste Type</FormLabel>
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
                        <SelectItem value='BIO_DEGRADABLE'>
                          Bio-degradable
                        </SelectItem>
                        <SelectItem value='NON_BIO_DEGRADABLE'>
                          Non bio-degradable
                        </SelectItem>
                        <SelectItem value='RECYCLABLE'>Recyclable</SelectItem>
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
