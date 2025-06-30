import { casinoProjection, objectProjections } from '@/src/data/projections'

export const casinoPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  casino-> {
    ${casinoProjection}
  },
  content[] {
    ${objectProjections}
  }
`
