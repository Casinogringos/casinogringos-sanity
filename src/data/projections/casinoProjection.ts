import {
  dashboardImageProjection,
  casinoRatingProjection, casinoBonusProjection, freeSpinsProjection,
} from '@/src/data/projections'

export const casinoProjection = `
    _type,
    _id,
    _key,
    slug {
        _type,
        current
    },
    brandColor,
    name,
    logo {
      ${dashboardImageProjection}
    },
    overallRating,
    casinoRatings[]-> {
      ${casinoRatingProjection}
    },
    casinoBonuses[]-> {
      ${casinoBonusProjection}
    },
    freeSpins[]-> {
      ${freeSpinsProjection}
    },
    advantages[],
    terms
`
