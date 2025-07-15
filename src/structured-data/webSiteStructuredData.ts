export const getWebSiteStructuredData = () => {
  return {
    '@type': 'WebSite',
    '@id': 'https://casinogringos.se/#website',
    url: 'https://casinogringos.se/',
    name: 'Casinogringos.se',
    description: 'Vi jämför och recenserar casino på nätet',
    publisher: {
      '@id': 'https://casinogringos.se/#organization',
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://casinogringos.se/?s={search_term_string}',
        },
        'query-input': {
          '@type': 'PropertyValueSpecification',
          valueRequired: true,
          valueName: 'search_term_string',
        },
      },
    ],
    inLanguage: 'sv-SE',
  }
}
