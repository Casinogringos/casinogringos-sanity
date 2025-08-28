import { z } from 'zod'

export const CategorySchema = z.object({
    _type: z.literal('categorys'),
    _id: z.string(),
    title: z.string(),
    slug: z.object({
        current: z.string(),
    }),
})

export type CategorySchemaType = z.infer<typeof CategorySchema>
