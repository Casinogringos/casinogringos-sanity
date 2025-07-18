import { z } from 'zod'
import { SanityImageSchema } from '@/src/schemas'

export const AuthorSchema = z.object({
  _id: z.string(),
  _type: z.literal('authors'),
  slug: z.object({
    current: z.string(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  description: z.string().optional(),
  role: z.string(),
  linkedIn: z.string().optional(),
  avatar: SanityImageSchema.optional(),
  email: z.string().optional(),
})

export type AuthorSchemaType = z.infer<typeof AuthorSchema>
