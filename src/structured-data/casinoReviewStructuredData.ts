import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import CasinoService from '@/src/services/CasinoService'
import fs from 'fs'

const casinoService = new CasinoService()

const getReviewStructuredData = ({ reviewPage }: { reviewPage: CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType | SlotPageSchemaType }) => {

  return {
    '@context': 'https://schema.org/',
    '@type': 'Review',
    "@id": `https://casinogringos.se${reviewPage.slug.current}#review`,
    name: reviewPage.title,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewPage.casino.overallRating,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: reviewPage.author.firstName + ' ' + reviewPage.author.lastName,
      url: `https://casinogringos.se/om-oss/${reviewPage.author.slug.current}`,
      email: null,
      jobTitle: 'Skribent',
      sameAs: reviewPage.author.linkedIn,
      image: {
        '@type': 'ImageObject',
        inLanguage: 'sv-SE',
        id: 'https://casinogringos.se/#/schema/person/image/',
        url: reviewPage.author.avatar.src,
      },
    },
    publisher: {
      "@id": "https://casinogringos.se/#organization",
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