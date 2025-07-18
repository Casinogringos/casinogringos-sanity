import { z } from 'zod'
import { BasePagePreviewSchema } from '@/src/schemas'
import { ImageObjectSchema } from './imageObject'

export const NewsPagePreviewSchema = BasePagePreviewSchema.merge(
  z.object({
    featuredImage: ImageObjectSchema,
  })
)

export type NewsPagePreviewSchemaType = z.infer<typeof NewsPagePreviewSchema>
