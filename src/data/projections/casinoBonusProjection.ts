import { bonusTypeProjection } from '@/src/data/projections/bonusTypeProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'

export const casinoBonusProjection = `
    _type,
    _id,
    name,
    bonusType-> {
      ${bonusTypeProjection}
    },
    bonusPercentage,
    bonusAmountRange {
      min,
      max
    },
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
