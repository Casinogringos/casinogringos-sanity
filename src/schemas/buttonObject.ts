import { z } from 'zod';
import { ButtonObject } from '../types/buttonObject';

// For page references, we'll use a simplified schema since these are complex types
const PageReferenceSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().optional(),
  slug: z.object({
    current: z.string()
  }).optional(),
});

export const ButtonObjectSchema = z.object({
  _type: z.literal('button-object'),
  _key: z.string(),
  title: z.string(),
  uri: z.object({
    current: z.string(),
  }),
  page: PageReferenceSchema.optional(),
});

export type ButtonObjectSchemaType = z.infer<typeof ButtonObjectSchema>;
