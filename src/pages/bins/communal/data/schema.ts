import { z } from 'zod'

export const communalBinSchema = z.object({
  bin_id: z.string(),
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  type: z.string(),
  installed_date: z.string(),
  fill_level: z.string(),
  status: z.string(),
  last_maintenance_date: z.string()
})

export type CommunalBin = z.infer<typeof communalBinSchema>
