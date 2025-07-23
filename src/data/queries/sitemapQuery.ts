export const sitemapQuery = (type: 'authors' | 'pages' | 'guide-pages' | 'news-pages' | 'casino-pages') => `
  *[_type == ${type}] {
    slug {
      current
    }
  }
`
