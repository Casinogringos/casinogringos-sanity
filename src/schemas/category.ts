import { z } from 'zod'

export const CategorySchema = z.object({
    _type: z.literal('categorys'),
    _id: z.string(),
    name: z.string(),
})

export type CategorySchemaType = z.infer<typeof CategorySchema>
