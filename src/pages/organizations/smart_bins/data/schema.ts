import { z } from 'zod'

export const BinSchema = z.object({
  bin_id: z.string(),
  type: z.string(),
  purchase_date: z.string(),
  last_maintenance_date: z.string(),
  other_notes: z.string(),
})

export type Bin = z.infer<typeof BinSchema>
