import { z } from 'zod';
import { Author } from '../types/author';

export const AuthorSchema = z.object({
  _id: z.string(),
  _type: z.literal('authors'),
  name: z.string(),
});

export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
