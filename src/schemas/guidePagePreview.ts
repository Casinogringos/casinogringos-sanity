import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { ImageObjectSchema } from './imageObject'

export const GuidePagePreviewSchema = BasePagePreviewSchema.extend({
    _type: z.literal('guide-pages'),
})

export type GuidePagePreviewSchemaType = z.infer<typeof GuidePagePreviewSchema>
