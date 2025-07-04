import { z } from 'zod';
import { Casino } from '../types/casino';
import { CasinoBonusSchema } from './casinoBonus';
import { DashboardImageObjectSchema } from './dashboardImageObject';
import { FreeSpinsSchema } from './freeSpins';

export const CasinoSchema = z.object({
  _type: z.literal('casinos'),
  _id: z.string(),
  _key: z.string(),
  logo: DashboardImageObjectSchema,
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string(),
  }),
  name: z.string(),
  brandColor: z.string(),
  overallRating: z.number(),
  casinoBonuses: z.array(CasinoBonusSchema),
  freeSpins: z.array(FreeSpinsSchema),
  advantages: z.array(z.string()),
  terms: z.string(),
});

export type CasinoSchemaType = z.infer<typeof CasinoSchema>;
