import {
  bonusTypeProjection,
  paymentMethodProjection,
} from '@/src/data/projections'

export const casinoBonusProjection = `
    _type,
    _id,
    name,
    bonusType-> {
      ${bonusTypeProjection}
    },
    bonusPercentage,
    minimumDeposit,
    wageringOn,
    validityPeriod,
    gameRestrictions[],
    maximumBetDuringWagering,
    maxWinLimit,
    excludedPaymentMethods-> [] {
      ${paymentMethodProjection}
    },
    terms,
    slug,
    bonusAmountRange[],
    wageringRequirements
`
