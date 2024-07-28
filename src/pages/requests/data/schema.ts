import { z } from 'zod'

export const requestSchema = z.object({
  request_id: z.string(),
  organization: z.string(),
  date: z.string(),
  time: z.string(),
  accummulated_waste: z.string(),
  type: z.string(),
  status: z.string(),
})

export type Request = z.infer<typeof requestSchema>
