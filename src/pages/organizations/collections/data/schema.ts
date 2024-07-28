import { z } from 'zod'

export const collectionHistorySchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  volume: z.string(),
  type: z.string(),
  truck_id: z.string(),
  routeDetails: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  other_notes: z.string().optional(),
})

export type collectionHistory = z.infer<typeof collectionHistorySchema>
