import { z } from 'zod'
import { BasePagePreviewSchema } from '@/src/schemas'
import { ImageObjectSchema } from './imageObject'

export const GuidePagePreviewSchema = BasePagePreviewSchema.merge(
  z.object({
    featuredImage: ImageObjectSchema,
  })
)

export type GuidePagePreviewSchemaType = z.infer<typeof GuidePagePreviewSchema>
