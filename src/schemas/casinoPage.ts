import { z } from 'zod'
import { BasePageSchema, ModularContentSchema } from '@/src/schemas'
import { CasinoSchema } from '@/src/schemas'
import { PortableTextBlockSchema } from '@/src/schemas'
import { SanityImageSchema } from '@/src/schemas'

export const CasinoPageSchema = BasePageSchema.extend({
  _type: z.literal('casino-pages'),
  content: ModularContentSchema,
  featuredImage: SanityImageSchema,
  casino: CasinoSchema,
  affiliateLink: z.string(),
  ratingMotivation: PortableTextBlockSchema,
})

export type CasinoPageSchemaType = z.infer<typeof CasinoPageSchema>
