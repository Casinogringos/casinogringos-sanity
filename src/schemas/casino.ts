import { z } from 'zod'
import { DashboardImageObjectSchema } from './dashboardImageObject'
import { OwnerSchema } from './owner'
import { LiveCasinoBonusSchema } from './liveCasinoBonus'
import { FreeSpinsSchema } from './freeSpins'
import { CasinoBonusSchema } from './casinoBonus'
import { LicenseSchema } from './license'
import { OddsBonusSchema } from './oddsBonus'
import { GameTypeSchema } from './gameType'
import { LiveCasinoGameTypeSchema } from './liveCasinoGameType'
import { SportSchema } from './sport'
import { GameProviderSchema } from './gameProvider'
import { ContactMethodSchema } from './contactMethod'
import { CasinoRatingSchema } from './casinoRating'
import { PaymentMethodSchema } from '@/src/schemas/paymentMethod'
import AffLinkSchema from '@/src/schemas/affLink'

export const CasinoSchema = z.object({
  _type: z.literal('casinos'),
  _id: z.string(),
  logo: DashboardImageObjectSchema,
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string(),
  }),
  affLink: AffLinkSchema,
  name: z.string(),
  brandColor: z.string(),
  casinoBonuses: z.array(CasinoBonusSchema).optional(),
  freeSpins: z.array(FreeSpinsSchema),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  owner: OwnerSchema,
  launchDate: z.string(),
  swedishLicense: z.boolean(),
  license: LicenseSchema,
  minimumDeposit: z.number(),
  terms: z.string().optional(),
  websiteAddress: z.string(),
  oddsBonuses: z.array(OddsBonusSchema),
  liveCasinoBonuses: z.array(LiveCasinoBonusSchema),
  defaultBonusText: z.string(),
  app: z.boolean(),
  typesOfGames: z.array(GameTypeSchema),
  amountOfSlots: z.number(),
  amountOfMegaways: z.number(),
  amountOfJackpots: z.number(),
  amountOfExclusiveGames: z.number(),
  typesOfLiveCasinoGames: z.array(LiveCasinoGameTypeSchema),
  amountOfLiveCasinoTables: z.number(),
  amountOfTableGames: z.number(),
  amountOfBingoGames: z.number(),
  sports: z.array(SportSchema),
  gameProviders: z.array(GameProviderSchema),
  openingHours: z.string(),
  contactMethods: z.array(ContactMethodSchema),
  overallRating: z.number(),
  availableDepositMethods: z.array(PaymentMethodSchema),
  availableWithdrawalMethods: z.array(PaymentMethodSchema),
  casinoRatings: z.array(CasinoRatingSchema),
})

export type CasinoSchemaType = z.infer<typeof CasinoSchema>
