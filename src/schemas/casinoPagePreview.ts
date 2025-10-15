import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { CasinoSchema } from './casino'
import AffLinkSchema from './affLink'
import { CasinoBonusPageSchema } from './casinoBonusPage'
import { OddsBonusPageSchema } from './oddsBonusPage'
import { LiveCasinoBonusPageSchema } from './liveCasinoBonusPage'
import { FreeSpinsPageSchema } from './freeSpinsPage'

export const CasinoPagePreviewSchema = BasePagePreviewSchema.extend({
  _type: z.literal('casino-pages'),
  casino: CasinoSchema,
  affLink: AffLinkSchema,
  casinoBonusPages: z.array(CasinoBonusPageSchema),
  oddsBonusPages: z.array(OddsBonusPageSchema),
  liveCasinoBonusPages: z.array(LiveCasinoBonusPageSchema),
  freeSpinsPages: z.array(FreeSpinsPageSchema),
})

export type CasinoPagePreviewSchemaType = z.infer<typeof CasinoPagePreviewSchema>
