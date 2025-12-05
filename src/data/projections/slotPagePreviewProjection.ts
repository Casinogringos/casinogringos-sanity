import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { slotProjection } from '@/src/data/projections/slotProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'

export const slotPagePreviewProjection = `
    _type,
    _id,
    _key,
    title,
    slug {
      _type,
      current
    },
    originalPublishedAt,
    _createdAt,
    _updatedAt,
    originalModifiedAt,
    publishedAt,
    seoTitle,
    seoDescription,
    seoImage {
      ${imageObjectProjection}
    },
    canonical,
    featuredImage {
      ${imageObjectProjection}
    },
    slot-> {
      ${slotProjection}
    }
`

export const getSlotPagePreviewProjection = ({
  author,
}: {
  author?: boolean
}): string => {
  return `
    ${slotPagePreviewProjection},
    ${
      author
        ? `author-> {
      ${authorProjection}
    }`
        : ''
    }
  `
}
