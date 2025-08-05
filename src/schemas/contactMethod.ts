import { z } from 'zod'

export const ContactMethodSchema = z.object({
    _type: z.literal('contact-methods'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    label: z.string(),
    value: z.string(),
    averageResponseTime: z.array(z.number()),
    _createdAt: z.string(),
    _updatedAt: z.string(),
})

export type ContactMethodSchemaType = z.infer<typeof ContactMethodSchema>