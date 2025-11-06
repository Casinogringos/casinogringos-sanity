import { freeSpinsTypeProjection } from '@/src/data/projections/freeSpinsTypeProjection'
import { gameProjection } from '@/src/data/projections/gameProjection'
import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { affLinkProjection } from '@/src/data/projections/affLinkProjection'

export const freeSpinsProjection = `
    _type,
    _id,
    _key,
    slug,
    name,
    freeSpinsType-> {
        ${freeSpinsTypeProjection}
    },
    affLink-> {
        ${affLinkProjection}
    },
    numberOfFreeSpins,
    wageringRequirements,
    minimumDeposit,
    eligibleGames[]-> {
        ${gameProjection}
    },
    valuePerSpin,
    maxWinLimit,
    totalValue,
    validityPeriod,
    excludedPaymentMethods[]-> {
        ${paymentMethodProjection}
    },
    _updatedAt,
    _createdAt
`
