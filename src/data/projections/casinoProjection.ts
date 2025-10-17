import { dashboardImageProjection } from '@/src/data/projections/dashboardImageProjection'
import { casinoRatingProjection } from '@/src/data/projections/casinoRatingProjection'
import { casinoBonusPageProjection } from '@/src/data/projections/casinoBonusPageProjection'
import { oddsBonusPageProjection } from '@/src/data/projections/oddsBonusPageProjection'
import { freeSpinsPageProjection } from '@/src/data/projections/freeSpinsPageProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { gameProviderProjection } from '@/src/data/projections/gameProviderProjection'
import { contactMethodProjection } from '@/src/data/projections/contactMethodProjection'
import { ownerProjection } from '@/src/data/projections/ownerProjection'
import { licenseProjection } from '@/src/data/projections/licenseProjection'
import { gameTypeProjection } from '@/src/data/projections/gameTypeProjection'
import { sportProjection } from '@/src/data/projections/sportProjection'
import { liveCasinoBonusProjection } from '@/src/data/projections/liveCasinoBonusProjection'
import { liveCasinoGameTypeProjection } from '@/src/data/projections/liveCasinoGameTypeProjection'
import { paymentMethodPageProjection } from '@/src/data/projections/paymentMethodPageProjection'
import { liveCasinoBonusPageProjection } from './liveCasinoBonusPageProjection'

export const casinoProjection = `
    _type,
    _id,
    slug {
        _type,
        current
    },
    name,
    brandColor,
    availableDepositMethods[]-> {
      'depositMethodPages': *[paymentMethod._ref == ^._id] {
        ${paymentMethodPageProjection}
      },
    },
    availableWithdrawalMethods[]-> {
      'withdrawalMethodPages': *[paymentMethod._ref == ^._id] {
        ${paymentMethodPageProjection}
      },
    },
    logo {
      ${dashboardImageProjection}
    },
    overallRating,
    casinoRatings[]-> {
      ${casinoRatingProjection}
    },
    "casinoBonusPages": *[_type == "casinoBonusPage" && casino._ref == ^._id]{
      ${casinoBonusPageProjection}
    },
    "oddsBonusPages": *[_type == "oddsBonusPage" && casino._ref == ^._id]{
      ${oddsBonusPageProjection}
    },
    "liveCasinoBonusPages": *[_type == "liveCasinoBonusPage" && casino._ref == ^._id]{
      ${liveCasinoBonusPageProjection}
    },
    "freeSpinsPages": *[_type == "freeSpinsPage" && casino._ref == ^._id]{
      ${freeSpinsPageProjection}
    },
    defaultBonusText,
    gameProviders[]-> {
      ${gameProviderProjection}
    },
    advantages[],
    disadvantages[],
    prosAndCons[],
    terms,
    contactMethods[]-> {
      ${contactMethodProjection}
    },
    owner-> {
      ${ownerProjection}
    },
    openingHours,
    launchDate,
    swedishLicense,
    license-> {
      ${licenseProjection}
    },
    websiteAddress,
    app,
    typesOfGames[]-> {
      ${gameTypeProjection}
    },
    amountOfSlots,
    amountOfMegaways,
    amountOfJackpots,
    amountOfExclusiveGames,
    typesOfLiveCasinoGames[]-> {
      ${liveCasinoGameTypeProjection}
    },
    amountOfLiveCasinoTables,
    amountOfTableGames,
    amountOfBingoGames,
    sports[]-> {
      ${sportProjection}
    },
`
