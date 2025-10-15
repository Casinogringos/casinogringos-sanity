import { z } from 'zod'
import { BonusTypeSchema } from './bonusType'
import { PaymentMethodSchema } from './paymentMethod'
import { CasinoBonusSchema } from './casinoBonus'
import AffLinkSchema from './affLink'

export const CasinoBonusPageSchema = z.object({
  _type: z.literal('casino-bonus-pages'),
  casinoBonus: CasinoBonusSchema,
  affLink: AffLinkSchema,
})

export type CasinoBonusPageSchemaType = z.infer<typeof CasinoBonusPageSchema>
