import { z } from 'zod';
import { CasinoBonus } from '../types/casinoBonus';
import { BonusTypeSchema } from './bonusType';
import { PaymentMethodSchema } from './paymentMethod';

export const CasinoBonusSchema = z.object({
  _type: z.literal('casino-bonuses'),
  name: z.string(),
  bonusType: BonusTypeSchema,
  bonusAmountRange: z.object({
    max: z.number(),
    min: z.number(),
  }),
  bonusPercentage: z.number(),
  minimumDeposit: z.number(),
  wageringRequirements: z.number(),
  wageringOn: z.string(),
  validityPeriod: z.number(),
  gameRestrictions: z.array(z.string()),
  maximumBetDuringWagering: z.number(),
  terms: z.string(),
  maxWinLimit: z.number(),
  excludedPaymentMethods: z.array(PaymentMethodSchema),
  publishedAt: z.string(),
});

export type CasinoBonusSchemaType = z.infer<typeof CasinoBonusSchema>;
