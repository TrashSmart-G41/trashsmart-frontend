import { z } from 'zod'

export const cleanerSchema = z.object({
  employee_id : z.string(),
  full_name: z.string(),
  contact_number: z.string(),
  region: z.string(),
  status: z.string(),
})

export type Cleaner = z.infer<typeof cleanerSchema>
