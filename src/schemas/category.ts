import { z } from 'zod'
import { SubPagePreviewSchema } from './subPagePreview'
import { NewsPagePreviewSchema } from './newsPagePreview'
import { SlotPagePreviewSchema } from './slotPagePreview'
import { GuidePagePreviewSchema } from './guidePagePreview'
import { CasinoPagePreviewSchema } from './casinoPagePreview'

export const CategorySchema = z.object({
    _type: z.literal('categorys'),
    _id: z.string(),
    title: z.string(),
    slug: z.object({
        current: z.string(),
    }),
    items: z.array(z.discriminatedUnion('_type', [SubPagePreviewSchema, NewsPagePreviewSchema, SlotPagePreviewSchema, GuidePagePreviewSchema, CasinoPagePreviewSchema]))
})

export type CategorySchemaType = z.infer<typeof CategorySchema>
