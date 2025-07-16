import { casinoProjection } from '@/src/data/projections'

export const casinoPagePreviewProjection = `
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
  }
`
