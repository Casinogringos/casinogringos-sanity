import { z } from 'zod'
import { SanityImageSchema } from './sanityImage'
import { PortableTextBlockSchema } from './portableTextBlock'
import { ExperienceObjectSchema } from './experienceObject'
import { CategorySchema } from './category'

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
  expertise: z.array(CategorySchema),
  experience: z.array(ExperienceObjectSchema),
})

export type AuthorSchemaType = z.infer<typeof AuthorSchema>
