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
    name,
    provider-> {
      ${gameProviderProjection}
    },
    launchDate,
    rtpRange,
    volatility,
    theme-> {
      ${slotThemeProjection}
    },
    numberOfPaylines,
    reels,
    rows,
    megaways,
    scatterPays,
    clusterPays,
    specialFeatures[] -> {
      ${slotFeatureProjection}
    },
    buyFeature,
    jackpot,
    featuredImage {
      ${dashboardImageProjection}
    },
    maxWin,
    progressiveJackpot,
    minBet,
    maxBet,
    advantages[],
    disadvantages[],
    rating,
`
