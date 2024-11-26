import { z } from 'zod'

export const commercialBinSchema = z.object({
  bin_id: z.string(),
  organization: z.string(),
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  type: z.string(),
  purchased_date: z.string(),
  fill_level: z.number(),
  status: z.string(),
  last_maintenance_date: z.string(),
})

export type CommercialBin = z.infer<typeof commercialBinSchema>
