import {
  dashboardImageProjection,
  casinoRatingProjection, casinoBonusProjection, freeSpinsProjection,
  paymentMethodProjection, gameProviderProjection, contactMethodProjection, ownerProjection, licenseProjection, oddsBonusProjection, liveCasinoBonusProjection,
  gameTypeProjection
} from '@/src/data/projections'

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
      ${paymentMethodProjection}
    },
    availableWithdrawalMethods[]-> {
      ${paymentMethodProjection}
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
