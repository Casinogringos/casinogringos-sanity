import { z } from 'zod'
import { BasePageSchema } from '@/src/schemas'
import { ModularContentSchema } from '@/src/schemas'
import { CasinoSchema } from '@/src/schemas'
import { PortableTextBlockSchema } from '@/src/schemas'

export const CasinoPageSchema = BasePageSchema.extend({
  _type: z.literal('casino-pages'),
  content: ModularContentSchema,
  casino: CasinoSchema,
  affiliateLink: z.string(),
  ratingMotivation: PortableTextBlockSchema,
})

export type CasinoPageSchemaType = z.infer<typeof CasinoPageSchema>
