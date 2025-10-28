import { bonusTypeProjection } from '@/src/data/projections/bonusTypeProjection'
import { gameTypeProjection } from '@/src/data/projections/gameTypeProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'

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