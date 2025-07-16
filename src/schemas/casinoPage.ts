import { z } from 'zod'
import { BasePageSchema } from './basePage'
import { ModularContentSchema } from './modularContent'
import { CasinoSchema } from './casino'

export const CasinoPageSchema = BasePageSchema.extend({
  _type: z.literal('casino-pages'),
  content: ModularContentSchema.optional(),
  casino: CasinoSchema,
  affiliateLink: z.string(),
})

export type CasinoPageSchemaType = z.infer<typeof CasinoPageSchema>
