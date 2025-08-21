import { z } from 'zod';
import { PortableTextBlockSchema } from './portableTextBlock';

export const RatingObjectSchema = z.object({
  _type: z.literal('rating-object'),
  _key: z.string(),
  rating: z.string(),
  motivation: z.array(PortableTextBlockSchema),
  title: z.string(),
});

export type RatingObjectSchemaType = z.infer<typeof RatingObjectSchema>;
