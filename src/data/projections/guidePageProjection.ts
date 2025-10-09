import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { objectProjections } from '@/src/data/projections/objectProjections'
import { toplistProjection } from '@/src/data/projections/toplistProjection'

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
  toplist-> {
    ${toplistProjection}
  },
  bonusCategory,
  content[] {
    ${objectProjections}
  },
  originalPublishedAt,
  originalModifiedAt,
  _createdAt,
  _updatedAt,
`
