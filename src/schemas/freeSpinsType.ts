import { z } from 'zod';
import { FreeSpinsType } from '../types/freeSpinsType';

export const FreeSpinsTypeSchema = z.object({
  _type: z.literal('free-spins-types'),
  _key: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  publishedAt: z.string(),
});

export type FreeSpinsTypeSchemaType = z.infer<typeof FreeSpinsTypeSchema>;
