import { objectProjections } from '@/src/data/projections'
import { toplistProjection } from '@/src/data/projections'
import { slotProjection } from '@/src/data/projections'
import { authorProjection } from '@/src/data/projections'
import { imageObjectProjection } from '@/src/data/projections'

export const slotPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  publishedAt,
  seoTitle,
  seoDescription,
  featuredImage {
    ${imageObjectProjection}
  },
  content[] {
    ${objectProjections}
  },
  toplist {
    ${toplistProjection}
  },
  slot-> {
    ${slotProjection}
  },
  author-> {
    ${authorProjection}
  },
`
