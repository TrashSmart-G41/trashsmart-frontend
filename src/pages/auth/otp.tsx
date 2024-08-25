import { Link } from 'react-router-dom'
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

export default function OTPVerification() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='mx-auto max-w-sm min-w-[500px]'>
        <CardHeader>
          <CardTitle className='text-xl'>OTP Verification</CardTitle>
          <CardDescription>
            Enter the OTP sent to your registered email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='otp'>OTP</Label>
              <Input id='otp' type='text' placeholder='Enter OTP' required />
            </div>
            <Button type='submit' className='w-full'>
              Verify OTP
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Didn't receive the OTP?{' '}
            <Link to='/resend-otp' className='underline'>
              Resend OTP
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
