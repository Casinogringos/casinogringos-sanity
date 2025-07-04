import { z } from 'zod';
import { SanityImage } from '../types/sanityImage';

export const SanityImageSchema = z.object({
  _type: z.string(),
  asset: z.object({
    _ref: z.string(),
    url: z.string(),
  }),
});

export type SanityImageSchemaType = z.infer<typeof SanityImageSchema>;
