import { z } from 'zod'
import { CasinoSchema } from './casino'
import { PortableTextBlockSchema } from './portableTextBlock'

export const CasinoObjectSchema = z.object({
  _type: z.literal('casino-object'),
  _key: z.string(),
  casino: CasinoSchema.optional(),
  offer: PortableTextBlockSchema,
  description: PortableTextBlockSchema,
  buttonText: z.string(),
})

export type CasinoObjectSchemaType = z.infer<typeof CasinoObjectSchema>
