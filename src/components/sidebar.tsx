import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import {
  sidelinks,
  sidelinks_insitutes,
  sidelinks_plants,
} from '@/data/sidelinks'
import LogoLg from '@/assets/logo2-lg.png'
import LogoSm from '@/assets/trashsmart-icon.png'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  useInstituteLinks: boolean // New prop to choose between sidelinks and sidelinks_institutes
  usePlantLinks: boolean // New prop to choose between sidelinks and sidelinks_plants
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
  useInstituteLinks, // Include new prop here
  usePlantLinks, // Include new prop here
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  // const links = useInstituteLinks ? sidelinks_insitutes : sidelinks // Select links based on the new prop
  if (useInstituteLinks) {
    var links = sidelinks_insitutes
  } else if (usePlantLinks) {
    var links = sidelinks_plants
  } else {
    var links = sidelinks
  }

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-20' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='z-50 flex justify-between px-4 py-3 md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
              {isCollapsed ? (
                <img src={LogoSm} alt='Logo' className='w-8 rounded-lg' />
              ) : (
                <img src={LogoLg} alt='Logo' className='ml-2 h-8' />
              )}
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={links} // Use the selected links here
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='ghost'
          className='absolute -right-1.5 z-50 mt-[14px] hidden rounded-xl border bg-background font-bold hover:border-0 md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
