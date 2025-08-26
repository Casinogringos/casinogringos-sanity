import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'

export const guidePageProjection = `
  _type,
  _id,
  title,
  slug,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  canonical,
  author-> {
    ${authorProjection}
  },
  reviewer-> {
    ${authorProjection}
  },
  featuredImage {
    ${imageObjectProjection}
  },
  content[] {
    ${objectProjections}
  },
  originalPublishedAt,
  originalModifiedAt,
  _createdAt,
  _updatedAt,
`
