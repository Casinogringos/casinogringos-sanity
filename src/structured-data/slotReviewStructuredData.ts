import { SlotPageSchemaType } from "@/src/schemas/slotPage"

const getSlotReviewStructuredData = ({
  page,
}: {
  page: SlotPageSchemaType
}) => {
  const { slot } = page

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
      ratingValue: slot.rating || "1",
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
      '@id': 'https://casinogringos.se/#organization',
    },
    isPartOf: [
      {
        '@id': 'https://casinogringos.se/#website',
      },
    ],
    datePublished: page.originalPublishedAt ?? page._createdAt,
    reviewBody: page.review,
  }
}

export default getSlotReviewStructuredData
