import { Card, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import { DeleteOrg } from './components/info/delete-popup'
import { useEffect, useState } from 'react'
import { fetchOrganization } from '@/pages/organizations/data/services.tsx'

type OrganizationData = {
  firstName: string
  address: string
  longitude: number
  latitude: number
  contractStartDate: string
  scale: string
  orgType: string
}

export default function Organization() {
  const [organization, setOrganization] = useState<OrganizationData | null>(null)

  useEffect(() => {
    const url = window.location.href
    const id = url.split('/').pop()?.slice(-3)
    // console.log('id:', id)

    const loadOrganization = async () => {
      try {
        const data: any = await fetchOrganization(id ?? '')
        const mappedData: OrganizationData = {
          firstName: data?.firstName ?? '',
          address: data?.address ?? '',
          longitude: data?.longitude ?? 0,
          latitude: data?.latitude ?? 0,
          contractStartDate: data?.contractStartDate ?? '',
          scale: data?.scale ?? '',
          orgType: data?.orgType
            ? data.orgType.charAt(0).toUpperCase() + data.orgType.slice(1).toLowerCase()
            : '',
        }
        // console.log('Organization:', data)
        setOrganization(mappedData)
        // console.log('Organization:', organization)
      } catch (error) {
        console.error('Failed to load organization:', error)
      }
    }
    loadOrganization()
  }, [])

  return (
    <Card className='rounded-xl bg-card p-4'>
      <div className='border-md relative rounded-md border p-4 '>
        <Button
          variant='outline'
          size='sm'
          className='hidde n absolute right-2 top-2 ml-auto h-8 lg:flex'
        >
          {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
          <svg
            className='mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06'
            />
          </svg>
          Edit
        </Button>

        <div className='pb-4 font-semibold'>General Information</div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <CardDescription className='text-[13px]'>
              Organization Name
            </CardDescription>
            <div className='mt-1 font-medium text-muted-foreground'>
              {organization?.firstName}
            </div>
          </div>
          <div>
            <CardDescription className='text-[13px]'>
              Organization Type
            </CardDescription>
            <div className='mt-1 font-medium text-muted-foreground'>
              {organization?.orgType}
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className='border-md relative mt-5 rounded-md border p-4'>
        <Button
          variant='outline'
          size='sm'
          className='hidde n absolute right-2 top-2 ml-auto h-8 lg:flex'
        >
          {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
          <svg
            className='mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06'
            />
          </svg>
          Edit
        </Button>

        <div className='pb-4 font-semibold'>Contact Information</div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <div>
              <CardDescription className='text-[13px]'>
                Primary Contact Person's Name
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                Senuri Wickramasinghe
              </div>
            </div>
            <div className='my-3'>
              <CardDescription className='text-[13px]'>
                Phone Number
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                077-4936420
              </div>
            </div>
            <div className='my-3'>
              <CardDescription className='text-[13px]'>Address</CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                {organization?.address}
              </div>
            </div>
          </div>

          <div>
            <div>
              <CardDescription className='text-[13px]'>
                Title/Position
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                Cleaning Personnel Supervisor
              </div>
            </div>
            <div className='my-3'>
              <CardDescription className='text-[13px]'>
                Email Address
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                supervisor@fos.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className='border-md relative mt-5 rounded-md border p-4'>
        <Button
          variant='outline'
          size='sm'
          className='hidde n absolute right-2 top-2 ml-auto h-8 lg:flex'
        >
          {/* <MixerHorizontalIcon className='mr-2 h-4 w-4' /> */}
          <svg
            className='mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1M9.71 17.18a2.6 2.6 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.79 1.79 0 0 0-2.47 0l-9.54 9.53a2.5 2.5 0 0 0-.64 1.12L6.04 17a.74.74 0 0 0 .19.72a.77.77 0 0 0 .53.22Zm.41-1.36a1.47 1.47 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.5 1.5 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.75.75 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06'
            />
          </svg>
          Edit
        </Button>

        <div className='pb-4 font-semibold'>Contact Information</div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <div>
              <CardDescription className='text-[13px]'>
                Primary Contact Person's Name
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                Rusara Wimalasena
              </div>
            </div>
            <div className='my-3'>
              <CardDescription className='text-[13px]'>
                Phone Number
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                077-4936420
              </div>
            </div>
            <div className='my-3'>
              <CardDescription className='text-[13px]'>Address</CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                {organization?.address}
              </div>
            </div>
          </div>

          <div>
            <div>
              <CardDescription className='text-[13px]'>
                Title/Position
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                Cleaning Personnel Supervisor
              </div>
            </div>
            <div className='my-3'>
              <CardDescription className='text-[13px]'>
                Email Address
              </CardDescription>
              <div className='mt-1 font-medium text-muted-foreground'>
                supervisor@fos.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end pt-4'>
        {/* <Button variant="destructive">Delete Organization</Button> */}
        <DeleteOrg />
      </div>
    </Card>
  )
}
