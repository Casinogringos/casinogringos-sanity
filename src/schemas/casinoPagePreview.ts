import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { CasinoSchema } from './casino'

export const CasinoPagePreviewSchema = BasePagePreviewSchema.extend({
  _type: z.literal('casino-pages'),
  casino: CasinoSchema,
  affiliateLink: z.string(),
})

export type CasinoPagePreviewSchemaType = z.infer<typeof CasinoPagePreviewSchema>
