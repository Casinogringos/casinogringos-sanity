import { modularContentProjection } from '@/src/data/projections'

export const sitemapQuery = (type: 'authors' | 'pages' | 'guide-pages' | 'news-pages' | 'casino-pages') => `
  *[_type == '${type}'] {
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
    content[] -> {
      ${modularContentProjection}
    }
  }
`
