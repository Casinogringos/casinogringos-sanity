import { objectProjections } from '@/src/data/projections'

export const newsPageProjection = `
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
