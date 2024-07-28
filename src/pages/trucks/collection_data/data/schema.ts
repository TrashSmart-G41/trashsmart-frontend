import { z } from 'zod'

export const CollectionDataSchema = z.object({
  name: z.string(),
  scale: z.string(),
  address: z.string(),
  waste_volume: z.string(),
  status: z.string(),
})

export type CollectionData = z.infer<typeof CollectionDataSchema>
