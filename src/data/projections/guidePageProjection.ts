import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'

export const guidePageProjection = `
  _type,
  _id,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  canonical,
  author-> {
    ${authorProjection}
  },
  featuredImage {
    ${imageObjectProjection}
  },
  content[] {
    ${objectProjections}
  },
  _createdAt,
  _updatedAt,
`
