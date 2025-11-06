import { z } from 'zod'
import { BasePageSchema } from './basePage'
import { SlotSchema } from './slot'
import { PortableTextBlockSchema } from './portableTextBlock'
import { CasinoSchema } from '@/src/schemas/casino'

export const SlotPageSchema = BasePageSchema.merge(
  z.object({
    excerpt: z.array(PortableTextBlockSchema),
    slot: SlotSchema,
    casinos: z.array(CasinoSchema),
    latestCasinos: z.array(CasinoSchema),
  })
)

export type SlotPageSchemaType = z.infer<typeof SlotPageSchema>
