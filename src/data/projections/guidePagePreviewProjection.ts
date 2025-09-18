import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'

export const guidePagePreviewProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  _createdAt,
  _updatedAt,
  originalPublishedAt,
  originalModifiedAt,
  featuredImage {
    ${imageObjectProjection}
  },
  seoTitle,
  seoDescription
`

export const getGuidePagePreviewProjection = ({ author }: { author?: boolean }): string => {
  return `
    ${guidePagePreviewProjection},
    ${author ? `author-> {
      ${authorProjection}
    }` : ''}
  `
}
