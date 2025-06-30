export const casinoRatingProjection = `
    _type,
    _id,
    _key,
    slug {
        _type,
        current
    },
    name,
    ratingType,
    rating,
    bonusAmountRange,
    bonusPercentage,
    minimumDeposit,
    wageringRequirements,
    wageringOn,
    validityPeriod,
    gameRestrictions[],
    maximumBetDuringWagering,
    terms,
    maxWinLimit,
    excludedPaymentMethods[] {
      ${paymentMethodProjection}
    },
    publishedAt,
`
