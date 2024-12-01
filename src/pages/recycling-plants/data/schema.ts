import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const plantSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  contactNo: z.string(),
  brn: z.string(),
})

export type RecyclingPlant = z.infer<typeof plantSchema>
