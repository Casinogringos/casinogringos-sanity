import { bonusTypeProjection, paymentMethodProjection } from "@/src/data/projections";

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
