import { portableTextToPlainText } from '@/src/lib/utils'
import PageService from '@/src/services/SubPageService'
import { urlFor } from '@/src/lib/client'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'

const pageService = new PageService()

export const getWebPageStructuredData = (
  page: SubPageSchemaType | NewsPageSchemaType
) => {
  const publishedAt = pageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = pageService.getPageModifiedAtTimestamp(page)

  const structuredData = {
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
    thumbnailUrl: page.seoImage?.src,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    description: page.seoDescription,
    inLanguage: 'sv-SE',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: ['https://casinogringos.se/'],
      },
    ],
  }

  return structuredData
}
