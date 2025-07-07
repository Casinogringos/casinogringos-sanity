import { AuthorSchemaType, CasinoSchema, CasinoSchemaType } from '@/src/schemas'
import CasinoService from '@/src/services/CasinoService'
import fs from 'fs'

const casinoService = new CasinoService()

const getProductStructuredData = ({product, author}: { product: CasinoSchemaType; author: AuthorSchemaType }) => {
  const parse = CasinoSchema.safeParse(product)
  const { finalRating } = casinoService.getCasinoRatings({ casino: product })
  if (!parse.success) {
    console.error(`Invalid product structured data:\n${product.name}\n`, parse.error)
    fs.writeFileSync('structuredDataError.log', `\n\n${product.name}\n${JSON.stringify(parse.error)}`)
    return null
  }

  return {
    "@context": "https://schema.org/",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "image": product.logo.src,
      "name": product.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": finalRating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": `https://casinogringos.se/om-oss/${author.slug.current}`,
      "email": null,
      "jobTitle": "Skribent",
      "sameAs": author.linkedIn,
      "image": {
        "@type": "ImageObject",
        "inLanguage": "sv-SE",
        "id": "https://casinogringos.se/#/schema/person/image/",
        "url": author.avatar.image.asset.url
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Casinogringos",
      "url": "https://casinogringos.se",
      "sameAs": [
        "https://www.facebook.com/Casinogringos",
        "https://www.instagram.com/casinogringos/",
        "https://www.youtube.com/channel/UCeFbFMkDfTlLayuZmk_aXiA",
        "https://www.twitch.tv/casinogringos",
        "https://twitter.com/CasinoGringos"
      ]
    },
    "isPartOf": [
      {
        "id": "https://casinogringos.se/#website",
        "@type": "WebSite",
        "name": "Casinogringos.se",
        "url": "https://casinogringos.se",
        "inLanguage": "sv-se"
      }
    ]
  }
}

export default getProductStructuredData