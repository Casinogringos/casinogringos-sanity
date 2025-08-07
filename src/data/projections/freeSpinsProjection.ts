import { freeSpinsTypeProjection, gameProjection, paymentMethodProjection } from "@/src/data/projections";

export const freeSpinsProjection = `
    _type,
    _id,
    _key,
    slug,
    name,
    freeSpinsType-> {
        ${freeSpinsTypeProjection}
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
