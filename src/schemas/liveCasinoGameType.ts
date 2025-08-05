import { z } from 'zod'

export const LiveCasinoGameTypeSchema = z.object({
    _type: z.literal('liveCasinoGameType'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    _createdAt: z.string(),
    _updatedAt: z.string(),
})

export type LiveCasinoGameTypeSchemaType = z.infer<typeof LiveCasinoGameTypeSchema>
