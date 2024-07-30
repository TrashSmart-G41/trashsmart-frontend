// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuGroup,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function NotifyNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='icon' className='rounded-xl'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 16 16'
          >
            <path
              fill='currentColor'
              fill-rule='evenodd'
              d='M8 1a1 1 0 0 0-1 1v.1A5 5 0 0 0 3 7v4l-1.205 1.328c-.583.643-.127 1.672.74 1.672h3.733a2 2 0 0 0 3.464 0h3.733c.867 0 1.323-1.03.74-1.672L13 11V7a5 5 0 0 0-4-4.9V2a1 1 0 0 0-1-1M4.5 11.58l-.39.428l-.446.492h8.672l-.447-.492l-.389-.429V7a3.5 3.5 0 1 0-7 0z'
              clip-rule='evenodd'
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full bg-card' align='end' forceMount>
        <DropdownMenuItem className='min-w-72 max-w-screen-sm'>
          hi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
