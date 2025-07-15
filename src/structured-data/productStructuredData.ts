import { CasinoPageSchemaType } from '@/src/schemas'
import CasinoService from '@/src/services/CasinoService'
import { urlFor } from '@/src/lib/client'

const casinoService = new CasinoService()

const getProductStructuredData = ({
  productPage,
}: {
  productPage: CasinoPageSchemaType
}) => {
  const { casino } = productPage
  const { finalRating } = casinoService.getCasinoRatings({
    casino,
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: casino.name,
    image: urlFor(productPage.seoImage),
    description: productPage.seoDescription,
    brand: {
      '@type': 'Brand',
      name: casino.name,
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: productPage.reviewer.name,
        url: `https://casinogringos.se/experter/${productPage.reviewer.slug.current}`,
      },
      datePublished: productPage.originalPublishedAt ?? productPage._createdAt,
      dateModified: productPage._updatedAt ?? productPage.originalModifiedAt,
      reviewBody: casino.review,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: finalRating,
        bestRating: '5',
        worstRating: '1',
      },
    },
    author: {
      '@type': 'Person',
      name: productPage.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      url: 'https://casinogringos.se',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
  }
}

export default getProductStructuredData
