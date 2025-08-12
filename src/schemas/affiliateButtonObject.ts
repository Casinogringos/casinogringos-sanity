import { z } from 'zod';
import { CasinoSchema } from '@/src/schemas/casino';

export const AffiliateButtonObjectSchema = z.object({
  _type: z.literal('affiliate-button-object'),
  _key: z.string(),
  casino: CasinoSchema,
});

export type AffiliateButtonObjectSchemaType = z.infer<typeof AffiliateButtonObjectSchema>;
