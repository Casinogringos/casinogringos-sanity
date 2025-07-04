import { z } from 'zod';
import { ProsAndConsObject } from '../types/prosAndConsObject';
import { AuthorSchema } from './author';

// Create a simple schema for PortableTextBlock since it's from an external library
const PortableTextBlockSchema = z.object({
  _type: z.string().optional(),
  _key: z.string().optional(),
  style: z.string().optional(),
  markDefs: z.array(z.any()).optional(),
  children: z.array(z.any()).optional(),
}).passthrough();

export const ProsAndConsObjectSchema = z.object({
  _type: z.literal('pros-and-cons-object'),
  _key: z.string(),
  _id: z.string(),
  author: AuthorSchema,
  consTitle: z.string(),
  cons: z.array(PortableTextBlockSchema),
  prosTitle: z.string(),
  pros: z.array(PortableTextBlockSchema),
  product: z.string(),
});

export type ProsAndConsObjectSchemaType = z.infer<typeof ProsAndConsObjectSchema>;
