import { imageObjectProjection, objectProjections } from '@/src/data/projections'

export const newsPageProjection = `
  _type,
  _id,
  title,
  slug,
  featuredImage {
    ${imageObjectProjection}
  },
  publishedAt,
  seoTitle,
  seoDescription,
  content[] {
    ${objectProjections}
  }
`
