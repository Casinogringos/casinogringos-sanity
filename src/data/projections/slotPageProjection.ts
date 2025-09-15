import { objectProjections } from '@/src/data/projections/objectProjections'
import { toplistProjection } from '@/src/data/projections/toplistProjection'
import { slotProjection } from '@/src/data/projections/slotProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'
import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { casinoPagePreviewProjection } from '@/src/data/projections/casinoPagePreviewProjection'

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
    ${casinoPagePreviewProjection}
  },
  "latestCasinos": *[_type == 'casino-pages'][0...3] {
    ${casinoPagePreviewProjection}
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
