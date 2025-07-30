import {
  dashboardImageProjection,
  slotThemeProjection,
  slotFeatureProjection,
  gameProviderProjection,
} from '@/src/data/projections'

export const slotProjection = `
    _type,
    _id,
    _key,
    slug {
        _type,
        current
    },
    provider-> {
      ${gameProviderProjection}
    },
    launchDate,
    theme-> {
      ${slotThemeProjection}
    },
    rtpRange,
    volatility,
    numberOfPaylines,
    reels,
    rows,
    megaways,
    buyFeature,
    jackpot,
    featuredImage {
      ${dashboardImageProjection}
    },
    maxWin,
    progressiveJackpot,
    minBet,
    maxBet,
    specialFeatures->[] {
      ${slotFeatureProjection}
    },
    advantages[],
    disadvantages[],
    rating,
`
