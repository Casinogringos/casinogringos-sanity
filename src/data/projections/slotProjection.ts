import { dashboardImageProjection } from '@/src/data/projections/dashboardImageProjection'
import { slotThemeProjection } from '@/src/data/projections/slotThemeProjection'
import { slotFeatureProjection } from '@/src/data/projections/slotFeatureProjection'
import { gameProviderProjection } from '@/src/data/projections/gameProviderProjection'

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
