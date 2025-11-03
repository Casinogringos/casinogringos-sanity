export const getWebSiteStructuredData = () => {
  return {
    '@type': 'WebSite',
    '@id': 'https://casinogringos.se/#website',
    url: 'https://casinogringos.se',
    name: 'Casinogringos.se',
    description: 'Vi jämför och recenserar casino på nätet',
    inLanguage: 'sv-SE',
    publisher: {
      '@id': 'https://casinogringos.se/#organization',
    },
  }
}
