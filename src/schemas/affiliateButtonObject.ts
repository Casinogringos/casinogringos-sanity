import { z } from 'zod';
import { AffiliateButtonObject } from '../types/affiliateButtonObject';
import { CasinoSchema } from './casino';

export const AffiliateButtonObjectSchema = z.object({
  _type: z.literal('affiliate-button-object'),
  _key: z.string(),
  casino: CasinoSchema,
});

export type AffiliateButtonObjectSchemaType = z.infer<typeof AffiliateButtonObjectSchema>;
