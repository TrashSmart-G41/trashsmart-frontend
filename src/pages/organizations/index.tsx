import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { organizations } from './data/organizations'
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from '@/components/ui/card'

export default function Tasks() {
  return (
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
        <div className='grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                TOTAL USERS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  72,540
                </div>
                <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  1.7%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                TOTAL COLLECTIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-semibold text-muted-foreground'>
                72,540
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-primary'>
                WEEKLY WASTE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-primary'>
                  45 MT
                </div>
                <div className='flex flex-row text-primary'>
                  <TrendingUp className='pr-1' />
                  1.7%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
              <CardTitle className='text-md font-medium text-muted-foreground/70'>
                WEEKLY REQUESTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row items-center'>
                <div className='pr-2 text-4xl font-semibold text-muted-foreground'>
                  104
                </div>
                <div className='flex flex-row text-destructive'>
                  <TrendingDown className='pr-1' />
                  0.8%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card> */}
        </div>

        <Card className='mt-4'>
          <div className='rounded-xl  bg-card p-4'>
            <div className='mb-2 flex items-center justify-between space-y-2 '>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>
                  Organizations
                </h2>
                {/* <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p> */}
              </div>
            </div>

            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable data={organizations} columns={columns} />
            </div>
          </div>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
