import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useEffect, useState } from 'react'
import { fetchRecyclingPlant } from './data/services'
import { fetchAuction } from '../auctions/data/services'

type PlantData = {
  id: string
  firstName: string
  lastName: string
  email: string
  contactNo: string
  address: string
  profileURL: string
  LocalDateTime: string
  brn: string
  auctions: []
}

type AuctionData = {
  id: string
  auctionWasteType: string
  min_bid: number
  curr_bid: number
}

const Info = () => {
  const [plant, setPlant] = useState<PlantData | null>(null)
  const [auctions, setAuctions] = useState<AuctionData[]>([])

  const url = window.location.href
  const id = url.split('/').pop()?.slice(-1)
  console.log('id:', id)

  useEffect(() => {
    const loadPlant = async () => {
      try {
        const plant: any = await fetchRecyclingPlant(id ?? '')
        const mappedData: PlantData = {
          id: `PLANT-${plant.id.toString().padStart(3, '0')}`,
          firstName: plant.firstName,
          lastName: plant.lastName,
          email: plant.email,
          contactNo: plant.contactNo,
          address: plant.address,
          profileURL: plant.profileURL,
          LocalDateTime: plant.localDateTime,
          brn: plant.brn,
          auctions: Array.isArray(plant.auctions) ? plant.auctions : [],
        }

        setPlant(mappedData)

        if (mappedData.auctions.length > 0) {
          loadAuctions(mappedData.auctions)
        }
      } catch (error) {
        console.error('Failed to load Recycling Plants:', error)
      }
    }

    loadPlant()
  }, [])

  const loadAuctions = async (auctionIds: string[]) => {
    try {
      const auctionPromises = auctionIds.map((auctionId) =>
        fetchAuction(auctionId)
      )

      const auctionResults = await Promise.all(auctionPromises)

      const mappedAuctions = auctionResults.map((auc: any) => ({
        id: auc.id,
        auctionWasteType: auc.auctionWasteType,
        min_bid: auc.minimumBidAmount,
        curr_bid: auc.currentBid,
      }))

      setAuctions(mappedAuctions)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header sticky>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body>
          <Card className='mt-2'>
            <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-6'>
              <div className='col-span-1 p-4 pt-0 lg:col-span-3'>
                <CardHeader className='p-0'>
                  <div className='flex flex-row items-center justify-start'>
                    <CardTitle className='text-2xl font-bold text-muted-foreground'>
                      {plant?.id}
                    </CardTitle>

                    <Button
                      variant='scale_btn'
                      size='scale_btn'
                      className='ml-4 bg-cyan-500/25 text-cyan-500'
                    >
                      <svg
                        className='mr-2 inline-block'
                        xmlns='http://www.w3.org/2000/svg'
                        width='8'
                        height='8'
                        viewBox='0 0 24 24'
                      >
                        <circle cx='12' cy='12' r='12' fill='currentColor' />
                      </svg>
                      ACTIVE
                    </Button>
                  </div>
                  <CardDescription className=''>
                    {plant?.firstName}
                  </CardDescription>
                  <CardDescription className='pt-3 text-muted-foreground/60'>
                    Joined on {plant?.LocalDateTime}
                  </CardDescription>
                </CardHeader>
              </div>
              <div className='col-span-1 flex items-center p-4 pt-0 sm:justify-start sm:pt-0 lg:col-span-3 lg:justify-end'>
                <Button className='hidden px-2 md:block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fill='currentColor'
                      fill-rule='evenodd'
                      d='M3.5 1.5v13h5.75a.75.75 0 0 1 0 1.5H3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h6.644a1 1 0 0 1 .72.305l3.355 3.476a1 1 0 0 1 .281.695V6.25a.75.75 0 0 1-1.5 0V6H9.75A1.75 1.75 0 0 1 8 4.25V1.5zm6 .07l2.828 2.93H9.75a.25.25 0 0 1-.25-.25zM13 15a.75.75 0 0 1-.75-.75v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5A.75.75 0 0 1 13 15'
                      clip-rule='evenodd'
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>

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
                    Plant Name
                  </CardDescription>
                  <div className='mt-1 font-medium text-muted-foreground'>
                    {plant?.firstName}
                  </div>
                </div>
                <div>
                  <CardDescription className='text-[13px]'>
                    Contact Person's Name
                  </CardDescription>
                  <div className='mt-1 font-medium text-muted-foreground'>
                    {plant?.lastName}
                  </div>
                </div>
                <div>
                  <CardDescription className='text-[13px]'>
                    Business Registration Number
                  </CardDescription>
                  <div className='mt-1 font-medium text-muted-foreground'>
                    {plant?.brn}
                  </div>
                </div>
                <div>
                  <CardDescription className='text-[13px]'>
                    Address
                  </CardDescription>
                  <div className='mt-1 font-medium text-muted-foreground'>
                    {plant?.address}
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
                      Email
                    </CardDescription>
                    <div className='mt-1 font-medium text-muted-foreground'>
                      {plant?.email}
                    </div>
                  </div>
                  <div className='my-3'>
                    <CardDescription className='text-[13px]'>
                      Contact No
                    </CardDescription>
                    <div className='mt-1 font-medium text-muted-foreground'>
                      {plant?.contactNo}
                    </div>
                  </div>
                  <div className='my-3'>
                    <CardDescription className='text-[13px]'>
                      ProfileURL
                    </CardDescription>
                    <div className='mt-1 font-medium text-muted-foreground'>
                      {plant?.profileURL}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-md relative mt-5 rounded-md border p-4'>
              <div className='pb-4 font-semibold'>Participated Auctions</div>
              <div className='m-2 w-1/2 rounded-lg border'>
                {' '}
                {/* Restrict width to 50% and align left */}
                {auctions.length > 0 ? (
                  <Table>
                    <TableHeader className='bg-background'>
                      <TableRow>
                        <TableHead>Auction ID</TableHead>
                        <TableHead>Waste Type</TableHead>
                        <TableHead className='text-right'>
                          Minimum Bid
                        </TableHead>
                        <TableHead className='text-right'>Final Bid</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auctions.map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell>{`AUC-${auction.id.toString().padStart(3, '0')}`}</TableCell>
                          <TableCell>{auction?.auctionWasteType}</TableCell>
                          <TableCell className='text-right'>
                            ${auction.min_bid.toFixed(2)}
                          </TableCell>
                          <TableCell className='text-right'>
                            ${auction.curr_bid.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className='p-4 text-gray-500'>
                    Haven't participated in any auctions.
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Layout.Body>
      </Layout>
    </>
  )
}

export default Info
