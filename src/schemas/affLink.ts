import { z } from 'zod'
import { ImageObjectSchema } from '@/src/schemas/imageObject'

const AffLinkSchema = z.object({
  link: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  title: z.string(),
  logo: ImageObjectSchema,
})

export type AffLinkSchemaType = z.infer<typeof AffLinkSchema>

export default AffLinkSchema
