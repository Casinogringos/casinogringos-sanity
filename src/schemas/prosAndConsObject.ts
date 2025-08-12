import { z } from 'zod'
import { AuthorSchema } from './author'
import { PortableTextBlockSchema } from './portableTextBlock'

export const ProsAndConsObjectSchema = z.object({
  _type: z.literal('pros-and-cons-object'),
  _key: z.string(),
  author: AuthorSchema.optional(),
  consTitle: z.string(),
  cons: z.array(PortableTextBlockSchema),
  prosTitle: z.string(),
  pros: z.array(PortableTextBlockSchema),
  product: z.string().optional(),
})

export type ProsAndConsObjectSchemaType = z.infer<
  typeof ProsAndConsObjectSchema
>
