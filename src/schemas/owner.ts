import { z } from 'zod'

export const OwnerSchema = z.object({
    _type: z.literal('owners'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
})

export type OwnerSchemaType = z.infer<typeof OwnerSchema>
