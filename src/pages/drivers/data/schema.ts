import { PasswordInput } from '@/components/custom/password-input'
import { z } from 'zod'

export const driverSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  contactNo: z.string(),
  address: z.string(),
  dob: z.string(),
  nic: z.string(),
  totalCollections: z.number().nullable(),
  currentStreak: z.number().nullable(),
  longestStreak: z.number().nullable(),
  totalActiveDays: z.number().nullable(),
  numberOfHolidays: z.number().nullable(),
  status: z.string(),
})

export type Driver = z.infer<typeof driverSchema>