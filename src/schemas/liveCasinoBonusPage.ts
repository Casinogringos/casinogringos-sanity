import z from "zod"
import { LiveCasinoBonusSchema } from "./liveCasinoBonus"
import AffLinkSchema from "./affLink"

export const LiveCasinoBonusPageSchema = z.object({
    _type: z.literal('live-casino-bonus-pages'),
    liveCasinoBonus: LiveCasinoBonusSchema,
    affLink: AffLinkSchema,
})

export type LiveCasinoBonusPageSchemaType = z.infer<typeof LiveCasinoBonusPageSchema>