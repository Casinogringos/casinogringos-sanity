import { objectProjections } from '@/src/data/projections'

export const pageProjection = `
  _type,
  _id,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  content {
    {...objectProjections}
  }
  ${objectProjections}
`
