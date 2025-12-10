import AffLinkSchema from '@/src/schemas/affLink'
import { PaymentMethodSchema } from '@/src/schemas/paymentMethod'
import { z } from 'zod'
import { CasinoBonusSchema } from './casinoBonus'
import { CasinoRatingSchema } from './casinoRating'
import { ContactMethodSchema } from './contactMethod'
import { DashboardImageObjectSchema } from './dashboardImageObject'
import { FreeSpinsSchema } from './freeSpins'
import { GameProviderSchema } from './gameProvider'
import { GameTypeSchema } from './gameType'
import { LicenseSchema } from './license'
import { LiveCasinoBonusSchema } from './liveCasinoBonus'
import { LiveCasinoGameTypeSchema } from './liveCasinoGameType'
import { OddsBonusSchema } from './oddsBonus'
import { OwnerSchema } from './owner'
import { PortableTextBlockSchema } from './portableTextBlock'
import { SportSchema } from './sport'

export const CasinoSchema = z.object({
  _type: z.literal('casinos'),
  _id: z.string(),
  logo: DashboardImageObjectSchema,
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string(),
  }),
  affLink: AffLinkSchema,
  excludeFromToplists: z.boolean(),
  roiRank: z.number().optional(),
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
  terms: PortableTextBlockSchema.optional(),
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
  parentCasinoPageSlug: z.string().optional(),
})

export type CasinoSchemaType = z.infer<typeof CasinoSchema>
