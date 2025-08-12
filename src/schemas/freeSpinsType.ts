import { z } from 'zod';

export const FreeSpinsTypeSchema = z.object({
  _type: z.literal('free-spins-types'),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type FreeSpinsTypeSchemaType = z.infer<typeof FreeSpinsTypeSchema>;
