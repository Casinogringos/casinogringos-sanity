export const sitemapQuery = (type: 'authors' | 'pages' | 'guide-pages' | 'news-pages') => `
  *[_type == ${type}] {
    slug {
      current
    }
  }
`
