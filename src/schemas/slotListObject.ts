import { z } from 'zod'
import { SlotPagePreviewSchema } from './slotPagePreview'

export const SlotListObjectSchema = z.object({
  _type: z.literal('slot-list-object'),
  _key: z.string(),
  slots: SlotPagePreviewSchema.array()
})

export type SlotListObjectSchemaType = z.infer<typeof SlotListObjectSchema>
