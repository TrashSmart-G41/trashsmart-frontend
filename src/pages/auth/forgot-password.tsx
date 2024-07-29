import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPassword() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/reset-password')
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Forgot Password</CardTitle>
          <CardDescription>
            Enter your registered email and we will send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <Button type='submit' className='w-full' onClick={handleClick}>
              Send Reset Link
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Remember your password?{' '}
            <Link to='/login' className='underline'>
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
