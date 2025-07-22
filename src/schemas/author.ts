import { z } from 'zod'
import { SanityImageSchema } from '@/src/schemas'
import { PortableTextBlockSchema } from '@/src/schemas/portableTextBlock'

export const AuthorSchema = z.object({
  _id: z.string(),
  _type: z.literal('authors'),
  slug: z.object({
    current: z.string(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  description: z.array(PortableTextBlockSchema),
  role: z.string(),
  linkedIn: z.string().optional(),
  avatar: SanityImageSchema,
  email: z.string().optional(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  canonical: z.string(),
  expertise: z.array(z.object({
    title: z.string(),
  })),
  experience: z.array(z.object({
    title: z.string(),
    years: z.number(),
  })),
})

export type AuthorSchemaType = z.infer<typeof AuthorSchema>
