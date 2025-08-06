import {
  dashboardImageProjection,
  casinoRatingProjection, casinoBonusProjection, freeSpinsProjection,
  paymentMethodProjection, gameProviderProjection, contactMethodProjection
} from '@/src/data/projections'

export const casinoProjection = `
    _type,
    _id,
    slug {
        _type,
        current
    },
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
    freeSpins[]-> {
      ${freeSpinsProjection}
    },
    gameProviders[]-> {
      ${gameProviderProjection}
    },
    advantages[],
    disadvantages[],
    prosAndCons[],
    terms,
    contactMethods[]-> {
      ${contactMethodProjection}
    }
`
