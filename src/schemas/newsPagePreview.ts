import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { PortableTextBlockSchema } from './portableTextBlock'

export const NewsPagePreviewSchema = BasePagePreviewSchema.extend({
    _type: z.literal('news-pages'),
    excerpt: PortableTextBlockSchema,
})

export type NewsPagePreviewSchemaType = z.infer<typeof NewsPagePreviewSchema>
