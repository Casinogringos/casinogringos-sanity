import z from "zod"
import { BonusTypeSchema } from "./bonusType"
import { GameTypeSchema } from "./gameType"
import { PaymentMethodSchema } from "./paymentMethod"
import { PortableTextBlockSchema } from "./portableTextBlock"

export const LiveCasinoBonusSchema = z.object({
    _type: z.literal('live-casino-bonuses'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    bonusType: BonusTypeSchema,
    bonusAmountRange: z.object({
        min: z.number(),
        max: z.number(),
    }),
    bonusPercentage: z.number(),
    minimumDeposit: z.number(),
    wageringRequirements: z.number(),
    wageringOn: PortableTextBlockSchema,
    validityPeriod: z.number(),
    excludedPaymentMethods: z.array(PaymentMethodSchema),
    allowedTableGames: z.array(GameTypeSchema),
    maximumBetDuringWagering: z.number(),
    maxWinLimit: z.number(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
})

export type LiveCasinoBonusSchemaType = z.infer<typeof LiveCasinoBonusSchema>