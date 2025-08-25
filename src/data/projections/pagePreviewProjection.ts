import { imageObjectProjection } from "./imageObjectProjection"

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
    ${imageObjectProjection}
  },
  canonical,
  intro,
  featuredImage {
    ${imageObjectProjection}
  },
`
