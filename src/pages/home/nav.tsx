import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
// import { IconLogin } from '@tabler/icons-react'
import { LogInIcon } from 'lucide-react'
import LogoLg from '@/assets/logo2-lg.png'
// import LogoSm from '@/assets/trashsmart-icon.png'
import kc from '@/security/keycloak'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'About', href: '#about' },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      {/* Hero */}
      {/* Nav */}
      <header className='fixed inset-x-0 top-0 z-50 bg-card'>
        <nav
          aria-label='Global'
          className='flex items-center justify-between p-4 lg:px-8'
        >
          <div className='flex lg:flex-1'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              {/* <img
                alt=''
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                className='h-8 w-auto'
              /> */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='ml-2 h-8'
              >
                <img src={LogoLg} alt='Logo' className='h-9' />
              </button>
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(true)}
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground'
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-md font-lg leading-6 text-muted-foreground'
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className='hidden items-center lg:flex lg:flex-1 lg:justify-end'>
            <ThemeSwitch className='text-muted-foreground' />
            {/* <a href="#" className="ml-2 text-md font-semibold leading-6 text-muted-foreground">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a> */}
            <Button onClick={() => kc.login()} variant='ghost' className='ml-2 h-8'>
              <span className='font-lg flex flex-1 items-center gap-1 text-muted-foreground'>
                Log In <LogInIcon className='w-4' />{' '}
              </span>
            </Button>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className='lg:hidden'
        >
          <div className='fixed inset-0 z-50' />
          <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <img
                  alt=''
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                  className='h-8 w-auto'
                />
              </a>
              <button
                type='button'
                onClick={() => setMobileMenuOpen(false)}
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon aria-hidden='true' className='h-6 w-6' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2  text-lg leading-7  text-muted-foreground  hover:bg-gray-50'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='flex flex-col items-center justify-center py-6'>
                  <ThemeSwitch className='w-full rounded-sm' />
                  {/* <a href="#" className="ml-2 text-md font-semibold leading-6 text-muted-foreground">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a> */}
                  <Button
                    onClick={() => kc.login()}
                    variant='ghost'
                    className='h-8 w-full hover:text-primary'
                  >
                    <span className='font-lg text-muted-foreground '>
                      Log In
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
}
