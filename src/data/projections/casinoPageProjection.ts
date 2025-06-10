import { objectProjections } from '@/src/data/projections'

export const casinoPageProjection = `
  _type,
  _id,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  content[] {
    ${objectProjections}
  }
`
