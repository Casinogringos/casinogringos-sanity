import { z } from 'zod';

export const GameSchema = z.object({
  _type: z.literal('games'),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type GameSchemaType = z.infer<typeof GameSchema>;
