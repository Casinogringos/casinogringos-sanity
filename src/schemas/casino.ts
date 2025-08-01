import { z } from 'zod'
import { CasinoBonusSchema } from './casinoBonus'
import { DashboardImageObjectSchema } from './dashboardImageObject'
import { FreeSpinsSchema } from './freeSpins'

export const CasinoSchema = z.object({
  _type: z.literal('casinos'),
  _id: z.string(),
  logo: DashboardImageObjectSchema,
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string(),
  }),
  name: z.string(),
  brandColor: z.string(),
  casinoBonuses: z.array(CasinoBonusSchema).optional(),
  freeSpins: z.array(FreeSpinsSchema),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  owner: OwnerSchema,
  launchDate: z.date(),
  swedishLicense: z.boolean(),
  license: LicenseSchema,
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
  depositMethods: z.array(PaymentMethodSchema),
  withdrawalMethods: z.array(PaymentMethodSchema),
  openingHours: z.string(),
  contactMethods: z.array(ContactMethodSchema),
  overallRating: z.number(),
  casinoRatings: z.array(CasinoRatingSchema),
})

export type CasinoSchemaType = z.infer<typeof CasinoSchema>
