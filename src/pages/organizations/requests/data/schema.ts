import { z } from 'zod'

export const requestHistorySchema = z.object({
  request_id: z.string(),
  date: z.string(),
  time: z.string(),
  accummulated_volume: z.string(),
  type: z.string(),
  status: z.string(),
})

export type RequestHistory = z.infer<typeof requestHistorySchema>
