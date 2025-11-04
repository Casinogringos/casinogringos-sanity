import { z } from 'zod'
import { BonusTypeSchema } from './bonusType'
import { PaymentMethodSchema } from './paymentMethod'
import AffLinkSchema from '@/src/schemas/affLink'

export const CasinoBonusSchema = z.object({
  _type: z.literal('casino-bonuses'),
  name: z.string(),
  affLink: AffLinkSchema,
  bonusType: BonusTypeSchema,
  bonusAmountRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  bonusPercentage: z.number(),
  minimumDeposit: z.number(),
  wageringRequirements: z.number(),
  wageringOn: z.string(),
  validityPeriod: z.number(),
  gameRestrictions: z.array(z.string()),
  maximumBetDuringWagering: z.number(),
  terms: z.string().optional(),
  maxWinLimit: z.number().optional(),
  excludedPaymentMethods: z.array(PaymentMethodSchema).optional(),
})

export type CasinoBonusSchemaType = z.infer<typeof CasinoBonusSchema>
