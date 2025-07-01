import {
  dashboardImageProjection,
  casinoRatingProjection,
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
`
