import { z } from 'zod'
import { CasinoBonusSchema } from './casinoBonus'
import { DashboardImageObjectSchema } from './dashboardImageObject'
import { FreeSpinsSchema } from './freeSpins'

export const CasinoSchema = z.object({
  _type: z.literal('casinos'),
  _id: z.string(),
  logo: DashboardImageObjectSchema,
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string(),
  }),
  name: z.string(),
  brandColor: z.string(),
  overallRating: z.number(),
  casinoBonuses: z.array(CasinoBonusSchema).optional(),
  freeSpins: z.array(FreeSpinsSchema),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  casinoRatings: z.array(
    z.object({
      ratingType: z.string(),
      rating: z.number(),
    })
  ),
  terms: z.string().optional(),
})

export type CasinoSchemaType = z.infer<typeof CasinoSchema>
