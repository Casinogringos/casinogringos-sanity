import { z, ZodAny } from 'zod'
import { AuthorSchema } from './author'
import { PortableTextBlockSchema } from './portableTextBlock'
import { SanityImageSchema } from './sanityImage'
import { ModularContentSchema } from './modularContent'
import { ToplistSchema } from './toplist'
import { CategorySchema } from './category'

// We'll define Toplist schema later to avoid circular dependencies
const ToplistPlaceholder = z.object({
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
  casinos: z.array(z.any()), // Will be replaced with CasinoPageSchema
})

export const BasePageSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  seoImage: SanityImageSchema,
  seoDescription: PortableTextBlockSchema,
  seoTitle: z.string(),
  canonical: z.string(),
  opengraphType: z.any(),
  category: z.string(),
  featuredImage: SanityImageSchema,
  intro: PortableTextBlockSchema,
  author: AuthorSchema,
  _createdAt: z.string(),
  originalPublishedAt: z.string().optional(),
  _updatedAt: z.string(),
  originalModifiedAt: z.string().optional(),
  reviewer: AuthorSchema.optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
        message: z.string().optional(),
      })
    )
    .optional(),
  content: ModularContentSchema,
  toplist: ToplistSchema.optional(),
})

export type BasePageSchemaType = z.infer<typeof BasePageSchema>
