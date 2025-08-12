import { bonusTypeProjection } from '@/src/data/projections/bonusTypeProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'

export const oddsBonusProjection = `
    _type,
    _id,
    slug,
    name,
    bonusType-> {
        ${bonusTypeProjection}
    },
    bonusAmountRange,
    minimumDeposit,
    wageringRequirements,
    validityPeriod,
    excludedPaymentMethods[]-> {
        ${paymentMethodProjection}
    },
    minimumOdds,
    maximumStake,
    _updatedAt,
    _createdAt
`
