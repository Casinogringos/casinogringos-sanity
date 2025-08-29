import { imageObjectProjection } from "./imageObjectProjection"
import { authorProjection } from "./authorProjection"

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
  }
`

export const getPagePreviewProjection = ({ author }: { author?: boolean }): string => {
  return `
    ${pagePreviewProjection},
    ${author ? `author-> {
      ${authorProjection}
    }` : ''}
  `
}
