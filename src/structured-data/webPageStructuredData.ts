import { portableTextToPlainText } from '@/src/lib/utils'
import PageService from '@/src/services/SubPageService'
import { urlFor } from '@/src/lib/client'
import { SubPageSchemaType } from '@/src/schemas/subPage'

const pageService = new PageService()

export const getWebPageStructuredData = (
  page: SubPageSchemaType
) => {
  if (!page.reviewer) return null
  const pageService = new PageService()
  const publishedAt = pageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = pageService.getPageModifiedAtTimestamp(page)

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
    reviewedBy: {
      '@type': 'Person',
      name: page.reviewer.firstName + ' ' + page.reviewer.lastName,
      email: page.reviewer.email,
      jobTitle: page.reviewer.role,
      description: portableTextToPlainText(page.reviewer.description),
      url: `https://casinogringos.se/om-oss/${page.reviewer.slug}`,
      sameAs: [page.reviewer.linkedIn],
    },
  }
}
