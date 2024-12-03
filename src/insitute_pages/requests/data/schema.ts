import { z } from 'zod'

export const requestSchema = z.object({
  id: z.number(),
  wasteType: z.string(),
  accummulatedVolume: z.number(),
  date: z.string(),
  time: z.string(),
  wasteCollectionRequestStatus: z.string(),
})

export type Request = z.infer<typeof requestSchema>
