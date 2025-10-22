export const getWebSiteStructuredData = () => {
  return {
    '@type': 'WebSite',
    '@id': 'https://casinogringos.se/#website',
    url: 'https://casinogringos.se',
    name: 'Casinogringos.se',
    description: 'Vi jämför och recenserar casino på nätet',
    publisher: {
      '@id': 'https://casinogringos.se/#organization',
    },
    potentialAction: {
      "@type": "SearchAction",
      "target": "https://casinogringos.se/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    },
  }
}
