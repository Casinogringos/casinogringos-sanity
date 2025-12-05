import { objectProjections } from '@/src/data/projections/objectProjections'

export const sitemapQuery = (
  type:
    | 'authors'
    | 'pages'
    | 'guide-pages'
    | 'news-pages'
    | 'casino-pages'
    | 'slot-pages'
) => `
  *[_type == '${type}' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*")] {
    slug {
      current
    },
    featuredImage {
      src
    },
    seoImage {
      src
    },
    originalModifiedAt,
    _updatedAt,
    _createdAt,
    originalPublishedAt,
    content[] {
      ${objectProjections}
    }
  }
`
