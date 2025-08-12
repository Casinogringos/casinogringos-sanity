import { imageProjection } from "./imageProjection"
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
    ${imageProjection}
  },
  canonical,
  intro,
  featuredImage {
    ${imageObjectProjection}
  },
`
