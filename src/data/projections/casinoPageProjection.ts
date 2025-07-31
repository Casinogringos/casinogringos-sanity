import { casinoProjection, objectProjections, imageObjectProjection } from '@/src/data/projections'

export const casinoPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  casino-> {
    ${casinoProjection}
  },
  content[] {
    ${objectProjections}
  }
`
