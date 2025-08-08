import {
  objectProjections,
  faqItemObjectProjection,
  toplistProjection,
  imageObjectProjection,
  authorProjection,
  imageProjection,
} from '@/src/data/projections'

export const pagePreviewProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  _createdAt,
  _updatedAt,
  seoTitle,
  seoDescription,
  seoImage {
    ${imageProjection}
  },
  canonical,
  intro,
  featuredImage {
    ${imageObjectProjection}
  },
`
