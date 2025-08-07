import { bonusTypeProjection, gameTypeProjection, paymentMethodProjection } from "@/src/data/projections";

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
    bonusAmountRange,
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