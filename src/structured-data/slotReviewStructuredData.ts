import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import SlotPageService from '@/src/services/SlotPageService'

const getSlotReviewStructuredData = ({
  page,
}: {
  page: SlotPageSchemaType
}) => {
  const { slot } = page
  const slotPageService = new SlotPageService()
  const publishedAt = slotPageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = slotPageService.getPageModifiedAtTimestamp(page)

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Game',
      name: page.seoTitle,
      description: page.seoDescription,
      author: {
        '@type': 'Organization',
        name: slot.name,
      },
      genre: ['Slot', 'Online Casino Game'],
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: slot.rating,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    datePublished: new Date(publishedAt ?? page._createdAt).toISOString(),
    dateModified: new Date(modifiedAt ?? page._updatedAt).toISOString(),
  }
}

export default getSlotReviewStructuredData
