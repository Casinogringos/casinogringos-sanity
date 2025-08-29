import { string, z } from 'zod'
import { SubPagePreviewSchema } from './subPagePreview'
import { NewsPagePreviewSchema } from './newsPagePreview'
import { SlotPagePreviewSchema } from './slotPagePreview'
import { GuidePagePreviewSchema } from './guidePagePreview'
import { CasinoPagePreviewSchema } from './casinoPagePreview'
import { CategorySchema } from './category'

export const SliderObjectSchema = z.object({
    _type: z.literal('slider-object'),
    _key: z.string(),
    category: CategorySchema,
    items: z.array(z.discriminatedUnion('_type', [SubPagePreviewSchema, NewsPagePreviewSchema, SlotPagePreviewSchema, GuidePagePreviewSchema, CasinoPagePreviewSchema]))
})

export type SliderObjectSchemaType = z.infer<typeof SliderObjectSchema>


