import { imageObjectProjection } from "@/src/data/projections/imageObjectProjection";

export const slotPagePreviewProjection = `
  _type,
  _id,
  _key,
  title,
  slug,
  seoTitle,
  seoDescription,
  featuredImage {
    ${imageObjectProjection}
  },
  _createdAt,
  _updatedAt
`
