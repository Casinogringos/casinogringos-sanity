import { SubPageSchemaType, CasinoPageSchemaType } from '@/src/schemas'
import { portableTextToPlainText } from '@/src/lib/utils'
import PageService from '@/src/services/SubPageService'
import { urlFor } from '@/src/lib/client'

const pageService = new PageService()

export const getWebPageStructuredData = (
  page: SubPageSchemaType | CasinoPageSchemaType
) => {
  if (!page.reviewer) return null

  return {
    '@type': 'WebPage',
    '@id': 'https://casinogringos.se/',
    url: 'https://casinogringos.se/',
    name: page.seoTitle,
    isPartOf: {
      '@id': 'https://casinogringos.se/#website',
    },
    about: {
      '@id': 'https://casinogringos.se/#organization',
    },
    primaryImageOfPage: {
      '@id': 'https://casinogringos.se/#primaryimage',
    },
    image: {
      '@id': 'https://casinogringos.se/#primaryimage',
    },
    thumbnailUrl: page.seoImage.src,
    datePublished: page._createdAt,
    dateModified: page._updatedAt,
    description: page.seoDescription,
    breadcrumb: {
      '@id': 'https://casinogringos.se/#breadcrumb',
    },
    inLanguage: 'sv-SE',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: ['https://casinogringos.se/'],
      },
    ],
    reviewedBy: {
      '@type': 'Person',
      name: page.reviewer.name,
      email: page.reviewer.email,
      jobTitle: page.reviewer.jobTitle,
      description: portableTextToPlainText(page.reviewer.description),
      url: `https://casinogringos.se/om-oss/${page.reviewer.slug}`,
      sameAs: [page.reviewer.linkedIn],
    },
  }
}
