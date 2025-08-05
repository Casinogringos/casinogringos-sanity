import z from "zod"

export const SportSchema = z.object({
    _type: z.literal('sport'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    _createdAt: z.string(),
    _updatedAt: z.string(),
})

export type SportSchemaType = z.infer<typeof SportSchema>