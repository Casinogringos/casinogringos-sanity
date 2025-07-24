import { z } from 'zod'
import { PortableTextBlockSchema } from '@/src/schemas/portableTextBlock'

export const ImageObjectSchema = z.object({
  _type: z.literal('image-object'),
  _key: z.string().optional(),
  _id: z.string().optional(),
  src: z.string(),
  alt: z.string(),
  caption: PortableTextBlockSchema.optional(),
  internalLink: z
    .object({
      _type: z.string(),
      slug: z.string(),
    })
    .optional(),
  externalLink: z.string().optional(),
})

export type ImageObjectSchemaType = z.infer<typeof ImageObjectSchema>
