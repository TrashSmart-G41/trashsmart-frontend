import { z } from 'zod';

// Define the schema for Organization
export const orgSchema = z.object({
  id: z.string(),
  name: z.string(),
  scale: z.string(),
  address: z.string(),
  waste_volume: z.string(),
  org_type: z.string(),
  weeklyWaste: z.string(),
  commercialBins: z.array(z.object({})).optional(),
});

// Derive the TypeScript type from the schema
export type Organization = z.infer<typeof orgSchema>;
