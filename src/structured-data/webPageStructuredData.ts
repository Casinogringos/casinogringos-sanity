import { SubPageSchemaType, CasinoPageSchemaType } from '@/src/schemas'
import PageService from '@/src/services/PageService'

const pageService = new PageService()

export const getWebPageStructuredData = (page: SubPageSchemaType | CasinoPageSchemaType) => {
  const isValid = pageService.validateSchema(page)
  if (!isValid) return null

  return {
    "@type": "WebPage",
    "@id": "https://casinogringos.se/",
    "url": "https://casinogringos.se/",
    "name": page.seoTitle,
    "isPartOf": {
      "@id": "https://casinogringos.se/#website"
    },
    "about": {
      "@id": "https://casinogringos.se/#organization"
    },
    "primaryImageOfPage": {
      "@id": "https://casinogringos.se/#primaryimage"
    },
    "image": {
      "@id": "https://casinogringos.se/#primaryimage"
    },
    "thumbnailUrl": page.featuredImage.image.url,
    "datePublished": page.publishedAt,
    "dateModified": page.modifiedAt,
    "description": page.seoDescription,
    "breadcrumb": {
      "@id": "https://casinogringos.se/#breadcrumb"
    },
    "inLanguage": "sv-SE",
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": [
          "https://casinogringos.se/"
        ]
      }
    ],
    "reviewedBy": {
      "@type": "Person",
      "name": page.reviewer.name,
      "email": page.reviewer.email,
      "jobTitle": page.reviewer.jobTitle,
      "description": page.reviewer.description,
      "url": `https://casinogringos.se/om-oss/${page.reviewer.slug}`,
      "sameAs": [
        page.reviewer.linkedIn,
      ]
    }
  }
}