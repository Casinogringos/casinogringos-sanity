export const getOrganizationStructuredData = () => {
  return {
    '@type': 'Organization',
    '@id': 'https://casinogringos.se/#organization',
    name: 'Casinogringos',
    url: 'https://casinogringos.se',
    logo: {
      '@type': 'ImageObject',
      inLanguage: 'sv-SE',
      '@id': 'https://casinogringos.se/#logo',
      url: `${process.env.SITE_URL}/casinogringos.webp`,
      width: 250,
      height: 118,
      caption: 'Casinogringos',
    },
    sameAs: [
      'https://www.facebook.com/Casinogringos',
      'https://x.com/CasinoGringos',
      'https://www.instagram.com/casinogringos',
      'https://www.youtube.com/channel/UCeFbFMkDfTlLayuZmk_aXiA/',
    ],
  }
}
