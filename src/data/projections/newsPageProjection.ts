import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'
import { authorProjection } from '@/src/data/projections/authorProjection'

export const newsPageProjection = `
  _type,
  _id,
  title,
  slug,
  featuredImage {
    ${imageObjectProjection}
  },
  originalPublishedAt,
  originalModifiedAt,
  _createdAt,
  _updatedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  canonical,
  content[] {
    ${objectProjections}
  },
  author-> {
    ${authorProjection}
  },
`
