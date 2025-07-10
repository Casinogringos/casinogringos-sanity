import { z } from 'zod';
import { ImageObjectSchema } from '@/src/schemas/imageObject';

export const AuthorSchema = z.object({
  _id: z.string(),
  _type: z.literal('authors'),
  slug: z.object({
    current: z.string(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  description: z.string().optional(),
  userType: z.object({
    role: z.string(),
    email: z.string().optional(),
  }),
  seo: z.object({
    social: z.object({
      linkedIn: z.string().optional(),
    }),
  }),
  role: z.string(),
  linkedIn: z.string().optional(),
  avatar: ImageObjectSchema,
  email: z.string().optional(),
});

export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
