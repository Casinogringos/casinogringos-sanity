import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { ImageObjectSchema } from './imageObject'

export const SlotPagePreviewSchema = BasePagePreviewSchema.merge(
  z.object({
    featuredImage: ImageObjectSchema,
  })
)

export type SlotPagePreviewSchemaType = z.infer<typeof SlotPagePreviewSchema>
