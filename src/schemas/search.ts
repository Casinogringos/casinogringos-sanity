import { z } from "zod";
import { ImageObjectSchema } from "./imageObject";

export const SearchSchemaItem = z.object({
    _type: z.enum(['casino-pages', 'guide-pages', 'news-pages', 'slot-pages', 'pages']),
    title: z.string(),
    slug: z.object({
        current: z.string(),
    }),
    featuredImage: ImageObjectSchema,
    modifiedAt: z.string(),
})

export const SearchSchema = z.array(SearchSchemaItem)

export type SearchSchemaType = z.infer<typeof SearchSchema>

export type SearchSchemaItemType = z.infer<typeof SearchSchemaItem>

