import { z } from 'zod'
import { BasePageSchema } from './basePage'
import { ModularContentSchema } from './modularContent'
import { CasinoSchema } from './casino'
import { PortableTextBlockSchema } from './portableTextBlock'
import { SanityImageSchema } from './sanityImage'

export const CasinoPageSchema = BasePageSchema.extend({
  _type: z.literal('casino-pages'),
  content: ModularContentSchema,
  featuredImage: SanityImageSchema,
  casino: CasinoSchema,
  affiliateLink: z.string(),
  ratingMotivation: PortableTextBlockSchema,
})

export type CasinoPageSchemaType = z.infer<typeof CasinoPageSchema>
