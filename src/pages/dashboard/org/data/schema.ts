import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orgSchema = z.object({
  id: z.string(),
  name: z.string(),
  scale: z.string(),
  address: z.string(),
  waste_volume: z.string(),
})

export type Organization = z.infer<typeof orgSchema>
