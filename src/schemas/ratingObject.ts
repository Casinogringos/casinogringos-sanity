import { z } from 'zod';

// Create a simple schema for PortableTextBlock since it's from an external library
const PortableTextBlockSchema = z.object({
  _type: z.string().optional(),
  _key: z.string().optional(),
  style: z.string().optional(),
  markDefs: z.array(z.any()).optional(),
  children: z.array(z.any()).optional(),
}).passthrough();

export const RatingObjectSchema = z.object({
  _type: z.literal('rating-object'),
  _key: z.string(),
  rating: z.string(),
  motivation: z.array(PortableTextBlockSchema),
  title: z.string(),
});

export type RatingObjectSchemaType = z.infer<typeof RatingObjectSchema>;
