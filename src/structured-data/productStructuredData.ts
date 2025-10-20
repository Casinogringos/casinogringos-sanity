import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
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
    "@id": `https://casinogringos.se${productPage.slug.current}#product`,
    name: casino.name,
    image: productPage.seoImage.src,
    description: productPage.seoDescription,
    brand: {
      '@type': 'Organization',
      "@id": `https://casinogringos.se${productPage.slug.current}#brand`,
      name: casino.name,
    },
    "positiveNotes": {
      "@type": "ItemList",
      "itemListElement": casino.advantages.map((advantage: string, i: number) => {
        return { "@type": "ListItem", "position": i + 1, "name": advantage }
      })
    },
    "negativeNotes": {
      "@type": "ItemList",
      "itemListElement": casino.disadvantages.map((disadvantage: string, i: number) => {
        return { "@type": "ListItem", "position": i + 1, "name": disadvantage }
      })
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": casino.overallRating,
      "bestRating": 5,
      "worstRating": 1,
      "reviewCount": 1
    },
    "isPartOf": { "@id": "https://casinogringos.se/#website" }
  }
}

export default getProductStructuredData
