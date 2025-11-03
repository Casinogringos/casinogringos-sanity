import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import CasinoService from '@/src/services/CasinoService'
import fs from 'fs'

const casinoService = new CasinoService()

const getReviewStructuredData = ({ reviewPage }: { reviewPage: CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType | SlotPageSchemaType }) => {
  let rating
  if (reviewPage._type === 'slot-pages') {
    const page = reviewPage as SlotPageSchemaType
    rating = page.slot.rating
  } else if (reviewPage._type === 'casino-pages') {
    const page = reviewPage as CasinoPageSchemaType
    rating = page.casino.overallRating
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    "@id": `https://casinogringos.se${reviewPage.slug.current}#review`,
    itemReviewed: {
      '@type': 'Product',
      "@id": `https://casinogringos.se${reviewPage.slug.current}#product`,
    },
    name: reviewPage.title,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      worstRating: '0',
      bestRating: '5',
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
        id: 'https://casinogringos.se/#/schema/person/image',
        url: reviewPage.author.avatar.src,
      },
    },
    "publisher": { "@id": "https://casinogringos.se/#organization" },
    "inLanguage": "sv-SE",
    "isPartOf": { "@id": "https://casinogringos.se/#website" }
  }
}

export default getReviewStructuredData