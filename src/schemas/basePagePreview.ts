import { z } from 'zod'
import { ImageObjectSchema } from './imageObject'

export const BasePagePreviewSchema = z.object({
  _id: z.string(),
  _type: z.enum([
    'pages',
    'casino-pages',
    'guide-pages',
    'news-pages',
    'slot-pages',
  ]),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  seoImage: ImageObjectSchema,
  featuredImage: ImageObjectSchema,
  _createdAt: z.string(),
  _updatedAt: z.string(),
  originalPublishedAt: z.string().optional(),
  originalModifiedAt: z.string().optional(),
  publishedAt: z.string().optional(),
})

export type BasePagePreviewSchemaType = z.infer<typeof BasePagePreviewSchema>
