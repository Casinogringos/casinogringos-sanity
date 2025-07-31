import { casinoProjection } from '@/src/data/projections'

export const casinoPagePreviewProjection = `
  _type,
  _id,
  title,
  slug {
    _type,
    current
  },
  publishedAt,
  seoTitle,
  seoDescription,
  casino-> {
    ${casinoProjection}
  }
`
