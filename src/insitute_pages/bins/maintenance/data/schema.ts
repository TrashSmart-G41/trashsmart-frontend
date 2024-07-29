import { z } from 'zod'

export const recordSchema = z.object({
  maintenance_id: z.string(),
  bin_id: z.string(),
  type: z.string(),
  date: z.string(),
  status: z.string(),
  other_notes: z.string(),
})

export type Record = z.infer<typeof recordSchema>
