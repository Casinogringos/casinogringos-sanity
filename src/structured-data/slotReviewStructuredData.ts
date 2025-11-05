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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.SITE_URL}${page.slug.current}#webpage`,
    },
    publisher: {
      '@id': `${process.env.SITE_URL}/#organization`,
    },
    isPartOf: [
      {
        '@id': `${process.env.SITE_URL}/#website`,
      },
    ],
    datePublished: page.originalPublishedAt ?? page._createdAt,
    reviewBody: page.review,
  }
}

export default getSlotReviewStructuredData
