export const sitemapQuery = (type: 'authors' | 'pages' | 'guide-pages') => `
  *[_type == ${type}] {
    slug {
      current
    }
  }
`
