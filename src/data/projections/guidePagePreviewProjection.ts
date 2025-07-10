import { imageObjectProjection } from '@/src/data/projections/imageObjectProjection'

export const guidePagePreviewProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  _createdAt,
  _updatedAt,
  featuredImage {
    ${imageObjectProjection}
  },
  seoTitle,
  seoDescription
`
