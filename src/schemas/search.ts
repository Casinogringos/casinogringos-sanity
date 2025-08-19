import { z } from "zod";

export const SearchSchema = z.array(z.object({
    _type: z.string(),
    title: z.string(),
    slug: z.object({
        current: z.string(),
    }),
    featuredImage: z.object({
        url: z.string(),
        alt: z.string(),
    }).optional(),
    originalModifiedAt: z.string().optional(),
    _updatedAt: z.string().optional(),
}))

export type SearchSchemaType = z.infer<typeof SearchSchema>
