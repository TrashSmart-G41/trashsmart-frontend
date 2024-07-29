export default function Features() {
  return (
    <>
      {/* Icon Blocks */}
      <div
        id='features'
        className='container rounded-xl bg-card py-16 lg:py-20'
      >
        {/* Grid */}
        <div className='grid gap-12 md:grid-cols-2'>
          <div className='lg:w-7/8 flex flex-col justify-center'>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
              <span className='text-primary'>What we offer</span>
            </h1>
            <p className='mt-3 text-lg text-muted-foreground'>
              At TrashSmart, we integrate cutting-edge technologies to provide a
              seamless and satisfying waste management experience. Discover how
              our innovative solutions can simplify your daily routines and
              enhance your environmental impact.
            </p>

            {/* <div className='mt-7 grid w-full gap-3 sm:inline-flex'>
                            <Button size={'lg'}>Get started</Button>
                            <Button variant={'outline'} size={'lg'}>
                                Contact sales team
                            </Button>
                        </div> */}
          </div>
          {/* End Col */}
          <div className='space-y-6 lg:space-y-10'>
            {/* Icon Block */}
            <div className='flex'>
              {/* Icon */}
              <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 21q-1.65 0-2.825-1.175T8 17t1.175-2.825T12 13t2.825 1.175T16 17t-1.175 2.825T12 21m0-2q.825 0 1.413-.587T14 17t-.587-1.412T12 15t-1.412.588T10 17t.588 1.413T12 19M3.05 8.6L1.575 7.225q2.025-1.975 4.7-3.1T12 3t5.725 1.125t4.7 3.1L20.95 8.6q-1.775-1.675-4.05-2.637T12 5t-4.9.963T3.05 8.6m14.25 3.425q-1.05-.95-2.4-1.487T12 10t-2.887.538T6.7 12.025L5.225 10.65Q6.575 9.4 8.313 8.7T12 8t3.675.7t3.075 1.95zM12 17'
                  />
                </svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base font-semibold sm:text-lg'>
                  Fill level control and alerts
                </h3>
                <p className='mt-1 text-muted-foreground'>
                  Fill level sensors check whether the bin needs to be emptied.
                  You will be get an alert on your phone or via e-mail when the
                  bins are full.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className='flex'>
              <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M20 8h-5v6H2v3h1a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5zM6 18.5A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5m12 0a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5M17 12V9.5h2.5l1.96 2.5zm1-5h-4v6H3L1.57 8H1V6h12l1-1h4z'
                  />
                </svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base font-semibold sm:text-lg'>
                  Real-time garbage truck tracking
                </h3>
                <p className='mt-1 text-muted-foreground'>
                  You can track the location of the garbage truck dispatched for
                  your location. You can easily know when to handover garbage
                  without missing a single collection date.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className='flex'>
              {/* Icon */}
              <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M6.016 4.502A2.976 2.976 0 0 0 3.038 7.48c0 2.233 2.978 5.53 2.978 5.53s2.978-3.297 2.978-5.53a2.976 2.976 0 0 0-2.978-2.978m0 4.041A1.063 1.063 0 1 1 7.079 7.48a1.064 1.064 0 0 1-1.063 1.063m15.008 2.753v-4.3a5 5 0 0 0-.204-1.333a4.996 4.996 0 0 0-9.796 1.216v.248l-.01.87v9.952h-.004v.041a2 2 0 0 1-4 0l.004-.037H7.01V16.01h-2v2h.002a3.998 3.998 0 0 0 7.996-.005h.002v-.982h.005V8.997l.01-1.87V6.88a3.001 3.001 0 0 1 6 .123v4.275a1.999 1.999 0 1 0 2 .018'
                  />
                </svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base font-semibold sm:text-lg'>
                  Optimal routes for the garbage trucks
                </h3>
                <p className='mt-1 text-muted-foreground'>
                  Routes of the dispatched garbage trucks will be optimized
                  using advanced algorithms to make our system environmentally
                  and economically efficient.
                </p>
              </div>
            </div>
            <div className='flex'>
              {/* Icon */}
              <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z'
                  />
                </svg>
              </span>
              <div className='ms-5 sm:ms-8'>
                <h3 className='text-base font-semibold sm:text-lg'>
                  Locate communal garbage bins
                </h3>
                <p className='mt-1 text-muted-foreground'>
                  Do you have some garbage to be disposed and you can’t find a
                  bin? Don’t worry our system will show you the nearest garbage
                  bins so you can easily dispose your garbage without a hassle.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </>
  )
}
