import { CasinoPageSchema, CasinoPageSchemaType } from '@/src/schemas'
import CasinoService from '@/src/services/CasinoService'
import fs from 'fs'

const casinoService = new CasinoService()

const getReviewStructuredData = ({ page }: {page: CasinoPageSchemaType}) => {
  const parse = CasinoPageSchema.safeParse(page)
  const { finalRating } = casinoService.getCasinoRatings({
    casino: page.casino,
  })
  if (!parse.success) {
    console.error(
      `Invalid review structured data:\n${page.title}\n`,
      parse.error
    )
    fs.writeFileSync(
      'structuredDataError.log',
      `\n\n${page.title}\n${JSON.stringify(parse.error)}`
    )
    return null
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      image: page.featuredImage.image.asset.url,
      name: page.title,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: finalRating,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: page.author.name,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      email: null,
      jobTitle: 'Skribent',
      sameAs: page.author.linkedIn,
      image: {
        '@type': 'ImageObject',
        inLanguage: 'sv-SE',
        id: 'https://casinogringos.se/#/schema/person/image/',
        url: page.author.avatar.image.asset.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      url: 'https://casinogringos.se',
      sameAs: [
        'https://www.facebook.com/Casinogringos',
        'https://www.instagram.com/casinogringos/',
        'https://www.youtube.com/channel/UCeFbFMkDfTlLayuZmk_aXiA',
        'https://www.twitch.tv/casinogringos',
        'https://twitter.com/CasinoGringos',
      ],
    },
    isPartOf: [
      {
        id: 'https://casinogringos.se/#website',
        '@type': 'WebSite',
        name: 'Casinogringos.se',
        url: 'https://casinogringos.se',
        inLanguage: 'sv-se',
      },
    ],
  }
}

export default getReviewStructuredData