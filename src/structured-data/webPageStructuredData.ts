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
  if (!publishedAt || !modifiedAt) return null

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
    thumbnailUrl: page.seoImage?.src,
    datePublished: new Date(publishedAt).toISOString(),
    dateModified: new Date(modifiedAt).toISOString(),
    description: page.seoDescription,
    inLanguage: 'sv-SE',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: ['https://casinogringos.se/'],
      },
    ],
  }
  if (page.featuredImage) {
    structuredData.image = {
      '@id': 'https://casinogringos.se/#primaryimage',
    }
  }
  return structuredData
}
