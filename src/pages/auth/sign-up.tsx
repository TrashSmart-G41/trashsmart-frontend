import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LogoLg from '@/assets/logo2-lg.png'

export default function SignUp() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='mx-auto max-w-sm  sm:min-w-[500px]'>
        <CardHeader className="flex justify-center">
        <h1 className='text-2xl font-semibold tracking-tight text-center mx-auto'>
              <img src={LogoLg} alt='Logo' className='h-9' />
            </h1>
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 '>
            <div className='grid gap-2'>
                <Label htmlFor='first-name'>First name</Label>
                <Input id='first-name' placeholder='Max' required />
              </div>
            <div className='grid gap-2'>
              <Label htmlFor='last-name'>Last name</Label>
              <Input id='last-name' placeholder='Robinson' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' />
            </div>
            <Button type='submit' className='w-full'>
              Create an account
            </Button>
            <Button variant='outline' className='w-full'>
              Sign up with Google
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='underline'>
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
