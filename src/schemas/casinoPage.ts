import { z } from 'zod'
import { BasePageSchema } from './basePage'
import { ModularContentSchema } from './modularContent'
import { CasinoSchema } from './casino'
import { PortableTextBlockSchema } from './portableTextBlock'
import { SanityImageSchema } from './sanityImage'
import AffLinkSchema from './affLink'
import { CasinoBonusPageSchema } from './casinoBonusPage'
import { OddsBonusPageSchema } from './oddsBonusPage'
import { LiveCasinoBonusPageSchema } from './liveCasinoBonusPage'
import { FreeSpinsPageSchema } from './freeSpinsPage'

export const CasinoPageSchema = BasePageSchema.extend({
  _type: z.literal('casino-pages'),
  content: ModularContentSchema,
  featuredImage: SanityImageSchema,
  casino: CasinoSchema,
  affLink: AffLinkSchema,
  ratingMotivation: PortableTextBlockSchema,
  casinoBonusPages: z.array(CasinoBonusPageSchema),
  oddsBonusPages: z.array(OddsBonusPageSchema),
  liveCasinoBonusPages: z.array(LiveCasinoBonusPageSchema),
  freeSpinsPages: z.array(FreeSpinsPageSchema),
})

export type CasinoPageSchemaType = z.infer<typeof CasinoPageSchema>
