import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'

export const casinoPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  intro,
  affLink-> {
    link
  }
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
