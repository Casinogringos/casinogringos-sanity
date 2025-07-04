import { z } from 'zod';
import { Game } from '../types/game';

export const GameSchema = z.object({
  _type: z.literal('games'),
  _key: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  publishedAt: z.string(),
});

export type GameSchemaType = z.infer<typeof GameSchema>;
