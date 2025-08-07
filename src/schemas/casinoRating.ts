import { z } from 'zod'

export const CasinoRatingSchema = z.object({
    _type: z.literal('casino-ratings'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    ratingType: z.string(),
    rating: z.number(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
})

export type CasinoRatingSchemaType = z.infer<typeof CasinoRatingSchema>
