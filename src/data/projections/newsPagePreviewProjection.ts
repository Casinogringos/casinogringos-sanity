import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'

export const newsPagePreviewProjection = `
  _type,
  _id,
  title,
  slug,
  featuredImage {
    ${imageObjectProjection}
  },
  publishedAt,
  seoTitle,
  seoDescription,
  originalPublishedAt,
  _createdAt,
  originalModifiedAt,
  _updatedAt
`
