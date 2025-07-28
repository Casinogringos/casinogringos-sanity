import { authorProjection, imageObjectProjection, objectProjections } from '@/src/data/projections'

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
