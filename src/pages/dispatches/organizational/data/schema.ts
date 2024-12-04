import { z } from 'zod'

export const dispatchSchema = z.object({
  dispatch_id: z.string(),
  region: z.string(),
  date: z.string(),
  time: z.string(),
  total_collections: z.number(),
  status: z.string(),
  wasteType: z.string(),
})

export type Dispatch = z.infer<typeof dispatchSchema>
