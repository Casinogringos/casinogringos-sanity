import { z } from 'zod';
import { BonusType } from '../types/bonusType';

export const BonusTypeSchema = z.object({
  _type: z.literal('bonus-types'),
  _key: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  publishedAt: z.string(),
});

export type BonusTypeSchemaType = z.infer<typeof BonusTypeSchema>;
