import { imageProjection } from "@/src/data/projections/imageProjection";

export const searchPagePreviewsQuery = () => `
  *[_type in ['news-pages', 'casino-pages', 'guide-pages', 'slot-pages', 'pages']] {
    _type,
    title,
    slug {
      current
    },
    featuredImage {
      ${imageProjection}
    },
    originalModifiedAt,
    originalPublishedAt,
    _createdAt,
    _updatedAt
  }
`
