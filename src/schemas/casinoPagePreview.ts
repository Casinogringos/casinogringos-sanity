import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { CasinoSchema } from './casino'
import AffLinkSchema from './affLink'

export const CasinoPagePreviewSchema = BasePagePreviewSchema.extend({
  _type: z.literal('casino-pages'),
  casino: CasinoSchema,
  affLink: AffLinkSchema,
})

export type CasinoPagePreviewSchemaType = z.infer<
  typeof CasinoPagePreviewSchema
>
