import { objectProjections } from '@/src/data/projections'

export const slotPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  content[] {
    ${objectProjections}
  }
`
