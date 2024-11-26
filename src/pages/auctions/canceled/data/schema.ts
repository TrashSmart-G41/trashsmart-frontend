import { z } from 'zod'

export const allAuctionsSchema = z.object({
  id: z.string(),
  wasteType: z.string(),
  weight: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  min_bid: z.string(),
  curr_bid: z.string(),
})

export type AllAuctions = z.infer<typeof allAuctionsSchema>
