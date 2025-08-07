import { casinoProjection, objectProjections, imageObjectProjection, authorProjection } from '@/src/data/projections'

export const casinoPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  intro,
  affiliateLink,
  publishedAt,
  seoTitle,
  ratingMotivation,
  canonical,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  casino-> {
    ${casinoProjection}
  },
  content[] {
    ${objectProjections}
  },
  author-> {
    ${authorProjection}
  },
  _updatedAt,
  _createdAt
`
