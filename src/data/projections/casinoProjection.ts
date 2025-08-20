import { dashboardImageProjection } from '@/src/data/projections/dashboardImageProjection'
import { casinoRatingProjection } from '@/src/data/projections/casinoRatingProjection'
import { casinoBonusProjection } from '@/src/data/projections/casinoBonusProjection'
import { oddsBonusProjection } from '@/src/data/projections/oddsBonusProjection'
import { freeSpinsProjection } from '@/src/data/projections/freeSpinsProjection'
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

export const casinoProjection = `
    _type,
    _id,
    slug {
        _type,
        current
    },
    name,
    brandColor,
    name,
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
    casinoBonuses[]-> {
      ${casinoBonusProjection}
    },
    oddsBonuses[]-> {
      ${oddsBonusProjection}
    },
    liveCasinoBonuses[]-> {
      ${liveCasinoBonusProjection}
    },
    freeSpins[]-> {
      ${freeSpinsProjection}
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
