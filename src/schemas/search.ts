import { z } from "zod";

export const SearchSchema = z.object({
    casinos: z.array(z.object({
        name: z.string(),
        slug: z.string(),
        featuredImage: z.object({
            url: z.string(),
            alt: z.string(),
        }),
    })),
    slots: z.array(z.object({
        name: z.string(),
        slug: z.string(),
        featuredImage: z.object({
            url: z.string(),
            alt: z.string(),
        }),
    })),
    guides: z.array(z.object({
        name: z.string(),
        slug: z.string(),
        featuredImage: z.object({
            url: z.string(),
            alt: z.string(),
        }),
    })),
    news: z.array(z.object({
        name: z.string(),
        slug: z.string(),
        featuredImage: z.object({
            url: z.string(),
            alt: z.string(),
        }),
    })),
    pages: z.array(z.object({
        name: z.string(),
        slug: z.string(),
        featuredImage: z.object({
            url: z.string(),
            alt: z.string(),
        }),
    })),
})

export type SearchSchemaType = z.infer<typeof SearchSchema>
