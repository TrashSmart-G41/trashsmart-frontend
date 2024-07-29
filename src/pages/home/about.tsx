import { Button } from '@/components/custom/button'
import MockupImg from './assets/mockup.png'

export default function About() {
  return (
    <>
      {/* Icon Blocks */}
      <div id='about' className='container rounded-xl bg-card py-10 lg:py-12'>
        <div className='mx-auto max-w-full'>
          {/* Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:gap-12'>
            <div className='flex w-full flex-col justify-center text-lg text-muted-foreground '>
              <h1 className='scroll-m-20 pb-4 text-4xl font-extrabold tracking-tight lg:text-5xl '>
                <span className='text-primary'>Who we are</span>
              </h1>
              <span className='mt-3'>
                Our team at TrashSmart consists of passionate innovators,
                engineers, and environmental enthusiasts dedicated to
                revolutionizing waste management. With expertise in technology,
                sustainability, and data science, we collaborate to create
                efficient and eco-friendly solutions. United by a shared vision,
                we strive to lead the industry in making the world cleaner and
                smarter.
              </span>
            </div>
            {/* End Col */}
            <div className='flex w-full  flex-col items-center justify-center'>
              <div className='relative ms-4'>
                <img
                  className='w-full rounded-md'
                  src={MockupImg}
                  alt='Image'
                />
              </div>
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        <h1 className='scroll-m-20 pt-4 text-3xl font-extrabold tracking-tight lg:pt-16 lg:text-3xl'>
          <span className='text-primary'>
            Over 3000 users are revolutionizing waste management with
            TrashSmart.
          </span>
        </h1>
        <div className='flex w-full items-center justify-center pt-4'>
          <p className='mx-auto w-full pb-6 text-lg leading-relaxed text-muted-foreground'>
            Whether you're an urban planner, a waste management contractor, or
            an eco-conscious citizen, TrashSmart is your solution. Join the
            world's leading platform for smart waste management to create a
            cleaner, greener future. Let's innovate together with TrashSmart.
          </p>
        </div>
        <div className='flex w-full items-center justify-center pt-4'>
          <p className='mx-auto w-full text-lg  font-bold leading-relaxed text-muted-foreground'>
            Sign up today for a cleaner, smarter future!
          </p>
        </div>
        <div className='mt-2 grid w-full gap-3 sm:inline-flex'>
          <Button size={'lg'}>Sign Up</Button>
          {/* <Button variant={'outline'} size={'lg'}>
                        Contact sales team
                    </Button> */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  )
}
