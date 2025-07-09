import { imageObjectProjection } from "@/src/data/projections"

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
  _createdAt,
  _updatedAt
`
