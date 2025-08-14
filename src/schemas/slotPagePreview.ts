import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { ImageObjectSchema } from './imageObject'
import { SlotSchema } from './slot'

export const SlotPagePreviewSchema = BasePagePreviewSchema.merge(
  z.object({
    featuredImage: ImageObjectSchema,
    slot: SlotSchema,
  })
)

export type SlotPagePreviewSchemaType = z.infer<typeof SlotPagePreviewSchema>
