import z from "zod"
import { PaymentMethodSchema, PortableTextBlockSchema, BonusTypeSchema, GameTypeSchema } from "@/src/schemas"

export const LiveCasinoBonusSchema = z.object({
    _type: z.literal('liveCasinoBonus'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    bonusType: BonusTypeSchema,
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