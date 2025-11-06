import { bonusTypeProjection } from '@/src/data/projections/bonusTypeProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const oddsBonusProjection = `
    _type,
    _id,
    slug,
    name,
    bonusType-> {
        ${bonusTypeProjection}
    },
    affLink-> {
        ${affLinkProjection}
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
