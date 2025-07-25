import { z } from 'zod'
import { BasePagePreviewSchema } from '@/src/schemas'
import { CasinoSchema } from '@/src/schemas'

export const CasinoPagePreviewSchema = BasePagePreviewSchema.extend({
  _type: z.literal('casino-pages'),
  casino: CasinoSchema,
  affiliateLink: z.string(),
})

export type CasinoPagePreviewSchemaType = z.infer<typeof CasinoPagePreviewSchema>
