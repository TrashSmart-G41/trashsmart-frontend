import { z } from 'zod'

export const truckSchema = z.object({
  truck_id: z.string(),
  licence_plate_number: z.string(),
  max_load_capacity: z.string(),
  status: z.string(),
  next_shift: z.string().nullable(),
  mileage: z.number().int().positive(),
})

export type Truck = z.infer<typeof truckSchema>
