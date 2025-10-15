import { z } from 'zod'
import { PortableTextBlockSchema } from './portableTextBlock'
import { CasinoPagePreviewSchema } from './casinoPagePreview'

export const CasinoObjectSchema = z.object({
  _type: z.literal('casino-object'),
  _key: z.string(),
  casinoPage: CasinoPagePreviewSchema.optional(),
  bonusCategory: z.string(),
  offer: PortableTextBlockSchema,
  description: PortableTextBlockSchema,
  buttonText: z.string(),
})

export type CasinoObjectSchemaType = z.infer<typeof CasinoObjectSchema>
