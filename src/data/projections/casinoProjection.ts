import { affLinkProjection } from '@/src/data/projections/affLinkProjection'
import { casinoBonusProjection } from '@/src/data/projections/casinoBonusProjection'
import { casinoRatingProjection } from '@/src/data/projections/casinoRatingProjection'
import { contactMethodProjection } from '@/src/data/projections/contactMethodProjection'
import { dashboardImageProjection } from '@/src/data/projections/dashboardImageProjection'
import { freeSpinsProjection } from '@/src/data/projections/freeSpinsProjection'
import { gameProviderProjection } from '@/src/data/projections/gameProviderProjection'
import { gameTypeProjection } from '@/src/data/projections/gameTypeProjection'
import { licenseProjection } from '@/src/data/projections/licenseProjection'
import { liveCasinoBonusProjection } from '@/src/data/projections/liveCasinoBonusProjection'
import { liveCasinoGameTypeProjection } from '@/src/data/projections/liveCasinoGameTypeProjection'
import { oddsBonusProjection } from '@/src/data/projections/oddsBonusProjection'
import { ownerProjection } from '@/src/data/projections/ownerProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { sportProjection } from '@/src/data/projections/sportProjection'

export const casinoProjection = `
    _type,
    _id,
    slug {
        _type,
        current
    },
    affLink-> {
      ${affLinkProjection}
    },
    excludeFromToplists,
    roiRank,
    name,
    brandColor,
    minimumDeposit,
    availableDepositMethods[]-> {
      ${paymentMethodProjection}
    },
    availableWithdrawalMethods[]-> {
      ${paymentMethodProjection}
    },
    casinoBonuses[] -> {
      ${casinoBonusProjection}
    },
    oddsBonuses[] -> {
      ${oddsBonusProjection}
    },
    liveCasinoBonuses[] -> {
      ${liveCasinoBonusProjection}
    },
    freeSpins[] -> {
      ${freeSpinsProjection}
    },
    logo {
      ${dashboardImageProjection}
    },
    overallRating,
    casinoRatings[]-> {
      ${casinoRatingProjection}
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
    "parentCasinoPageSlug": *[
      _type == "casino-pages" && (!defined(publishedAt) || publishedAt <= now()) && casino._ref == ^._id
    ][0].slug.current,
`
