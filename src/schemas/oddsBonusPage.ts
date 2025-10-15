import { z } from 'zod';
import { BonusTypeSchema } from './bonusType';
import { PaymentMethodSchema } from './paymentMethod';
import { OddsBonusSchema } from './oddsBonus';
import AffLinkSchema from './affLink';

export const OddsBonusPageSchema = z.object({
  _type: z.literal('odds-bonuses'),
  oddsBonus: OddsBonusSchema,
  affLink: AffLinkSchema,
});

export type OddsBonusPageSchemaType = z.infer<typeof OddsBonusPageSchema>;
