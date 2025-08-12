import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'

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
