import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'
import { authorProjection } from '@/src/data/projections/authorProjection'

export const newsPagePreviewProjection = `
  _type,
  _id,
  title,
  slug,
  featuredImage {
    ${imageObjectProjection}
  },
  excerpt,
  seoTitle,
  seoDescription,
  originalPublishedAt,
  _createdAt,
  originalModifiedAt,
  _updatedAt
`

export const getNewsPagePreviewProjection = ({ author }: { author?: boolean }): string => {
  return `
    ${newsPagePreviewProjection},
    ${author ? `author-> {
      ${authorProjection}
    }` : ''}
  `
}
