import { z } from 'zod'

export const cleanerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  contactNo: z.string(),
  address: z.string(),
  date_of_birth: z.string(),
  nic: z.string(),
  status: z.string(),
})

export type Cleaner = z.infer<typeof cleanerSchema>
