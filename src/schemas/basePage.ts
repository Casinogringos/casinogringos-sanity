import { z } from 'zod';
import { BasePage } from '../types/basePage';
import { AuthorSchema } from './author';
import { ImageObjectSchema } from './imageObject';
import { PortableTextBlockSchema } from './portableTextBlock';

// We'll define Toplist schema later to avoid circular dependencies
const ToplistPlaceholder = z.object({
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
  casinos: z.array(z.any()), // Will be replaced with CasinoPageSchema
});

export const BasePageSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  _key: z.string(),
  title: z.string(),
  publishedAt: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  excerpt: z.array(PortableTextBlockSchema),
  featuredImage: ImageObjectSchema,
  intro: z.array(PortableTextBlockSchema),
  author: AuthorSchema,
  modifiedAt: z.string(),
  reviewer: AuthorSchema,
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      message: z.string().optional(),
    })
  ).optional(),
  content: z.array(PortableTextBlockSchema),
  toplist: ToplistPlaceholder.optional(),
});

export type BasePageSchemaType = z.infer<typeof BasePageSchema>;
