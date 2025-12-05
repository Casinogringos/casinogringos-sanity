import { imageProjection } from '@/src/data/projections/imageProjection'

export const searchPagePreviewsQuery = () => `
  *[_type in ['news-pages', 'casino-pages', 'guide-pages', 'slot-pages', 'pages'] && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*")] {
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
