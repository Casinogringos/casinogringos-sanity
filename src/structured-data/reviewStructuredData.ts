import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import CasinoPageService from '@/src/services/CasinoPageService'
import { portableTextToPlainText } from '../utils/portableTextToPlainText'
const getReviewStructuredData = ({ reviewPage }: { reviewPage: CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType | SlotPageSchemaType }) => {
  let rating
  if (reviewPage._type === 'slot-pages') {
    const page = reviewPage as SlotPageSchemaType
    rating = page.slot.rating
  } else if (reviewPage._type === 'casino-pages') {
    const page = reviewPage as CasinoPageSchemaType
    rating = page.casino.overallRating
  }

  const casinoPageService = new CasinoPageService()
  const publishedAt = casinoPageService.getPagePublishedAtTimestamp(reviewPage as CasinoPageSchemaType)
  const modifiedAt = casinoPageService.getPageModifiedAtTimestamp(reviewPage as CasinoPageSchemaType)

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `https://casinogringos.se${reviewPage.slug.current}#review`,
    name: reviewPage.seoTitle ?? reviewPage.title,
    description: portableTextToPlainText(reviewPage.seoDescription),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating || '1',
      bestRating: '5',
      worstRating: '1',
    },
    ...(publishedAt && { datePublished: new Date(publishedAt).toISOString()}),
    ...(modifiedAt && { dateModified: new Date(modifiedAt).toISOString()}),
    author: {
      '@type': 'Person',
      name: `${reviewPage.author.firstName} ${reviewPage.author.lastName}`,
      url: `https://casinogringos.se/om-oss${reviewPage.author.slug.current}`,
      jobTitle: reviewPage.author.role,
      sameAs: reviewPage.author.linkedIn,
      image: {
        '@type': 'ImageObject',
        inLanguage: 'sv-SE',
        '@id': 'https://casinogringos.se/#/schema/person/image',
        url: reviewPage.author.avatar.src,
      },
    },
    itemReviewed: {
      '@id': `https://casinogringos.se${reviewPage.slug.current}#product`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se${reviewPage.slug.current}#webpage`,
    },
    publisher: {
      '@id': 'https://casinogringos.se/#organization',
    },
    isPartOf: [
      {
        '@id': 'https://casinogringos.se/#website',
      },
    ],
  };
}

export default getReviewStructuredData