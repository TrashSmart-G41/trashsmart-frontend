import { z } from 'zod'

export const commercialBinSchema = z.object({
  bin_id: z.string(),
  organization: z.string(),
  location: z.string(),
  type: z.string(),
  purchased_date: z.string(),
})

export type CommercialBin = z.infer<typeof commercialBinSchema>
