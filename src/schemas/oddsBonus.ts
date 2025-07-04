import { z } from 'zod';
import { OddsBonus } from '../types/oddsBonus';
import { BonusTypeSchema } from './bonusType';
import { PaymentMethodSchema } from './paymentMethod';

export const OddsBonusSchema = z.object({
  _type: z.literal('odds-bonuses'),
  name: z.string(),
  bonusType: BonusTypeSchema,
  bonusAmountRange: z.array(z.number()),
  minimumDeposit: z.number(),
  wageringRequirements: z.number(),
  validityPeriod: z.number(),
  excludedPaymentMethods: z.array(PaymentMethodSchema),
  minimumOdds: z.number(),
  maximumStake: z.number(),
});

export type OddsBonusSchemaType = z.infer<typeof OddsBonusSchema>;
