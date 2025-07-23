import { SlotPageSchemaType } from "@/src/schemas"

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
      applicationCategory: 'Gambling',
      operatingSystem: 'Web, iOS, Android',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: slot.rating,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: page.author.name,
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
    datePublished: page.originalPublishedAt ?? page._createdAt,
    reviewBody: page.review,
  }
}

export default getSlotReviewStructuredData
