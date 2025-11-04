import { bonusTypeProjection } from '@/src/data/projections/bonusTypeProjection'
import { gameTypeProjection } from '@/src/data/projections/gameTypeProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const liveCasinoBonusProjection = `
    _type,
    _id,
    name,
    slug {
        _type,
        current
    },
    bonusType-> {
        ${bonusTypeProjection}
    },
    bonusAmountRange {
        min,
        max
    },
    affLink-> {
        ${affLinkProjection}
    },
    bonusPercentage,
    minimumDeposit,
    wageringRequirements,
    wageringOn,
    validityPeriod,
    excludedPaymentMethods[]-> {
        ${paymentMethodProjection}
    },
    allowedTableGames[]-> {
        ${gameTypeProjection}
    },
    maximumBetDuringWagering,
    maxWinLimit,
    _updatedAt,
    _createdAt
`
