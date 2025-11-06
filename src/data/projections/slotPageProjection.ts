import { objectProjections } from '@/src/data/projections/objectProjections'
import { toplistProjection } from '@/src/data/projections/toplistProjection'
import { slotProjection } from '@/src/data/projections/slotProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'
import { casinoProjection } from '@/src/data/projections/casinoProjection'

export const slotPageProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  originalPublishedAt,
  _createdAt,
  _updatedAt,
  intro,
  originalModifiedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageObjectProjection}
  },
  canonical,
  casinos[] -> {
    ${casinoProjection}
  },
  "latestCasinos": *[_type == 'casinos'][0...3] {
    ${casinoProjection}
  },
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
