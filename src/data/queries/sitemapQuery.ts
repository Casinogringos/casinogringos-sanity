export const sitemapQuery = (type: 'authors' | 'pages') => `
  *[_type == ${type}] {
    slug {
      current
    }
  }
`
