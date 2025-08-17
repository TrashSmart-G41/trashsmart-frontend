import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandGoogle } from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { setAuthToken } from '@/lib/axiosHelper'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // Moved to the top level of the component

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await axios.post('api/v1/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        const contentType = response.headers['content-type']
        if (contentType && contentType.includes('application/json')) {
          setAuthToken(response.data.jwt)
          window.location.reload()
          setTimeout(() => {
            navigate('/')
          }, 1000)
        } else {
          // console.log('Unexpected response format')
          // form.setError('email', {
          //   message: 'Invalid email or password',
          // })
        }
      } else {
        // console.log('Login failed')
        // clear the form values
        form.setValue('email', '')
        form.setValue('password', '')
      }
    } catch (error) {
      // console.error('Login failed', error)
      // clear the form values
      // form.setValue('email', '')
      // form.setValue('password', '')

      form.setError('email', {
        message: '',
      })
      form.setError('password', {
        message: 'Invalid credentials',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<Link*/}
            {/*  to='/signup'*/}
            {/*  className='mt-2 text-right text-sm font-medium text-muted-foreground hover:opacity-75'*/}
            {/*>*/}
            {/*  Don't have an account? Sign up*/}
            {/*</Link>*/}
            <Button loading={isLoading} type='submit'>
              Login
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandGoogle className='h-4 w-4' />}
              >
                Google
              </Button>
              {/* <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandFacebook className='h-4 w-4' />}
              >
                Facebook
              </Button> */}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
