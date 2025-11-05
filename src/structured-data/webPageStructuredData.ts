import { portableTextToPlainText } from '@/src/lib/utils'
import PageService from '@/src/services/SubPageService'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'

const pageService = new PageService()

export const getWebPageStructuredData = (
  page:
    | SubPageSchemaType
    | NewsPageSchemaType
    | GuidePageSchemaType
    | SlotPageSchemaType
) => {
  const publishedAt = pageService.getPagePublishedAtTimestamp(
    page as SubPageSchemaType
  )
  const modifiedAt = pageService.getPageModifiedAtTimestamp(
    page as SubPageSchemaType
  )

  const structuredData: Record<string, any> = {
    '@type': 'WebPage',
    '@id': 'https://casinogringos.se',
    url: 'https://casinogringos.se',
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
    datePublished: new Date(publishedAt ?? page._createdAt).toISOString(),
    dateModified: new Date(modifiedAt ?? page._updatedAt).toISOString(),
    description: page.seoDescription,
    inLanguage: 'sv-SE',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: ['https://casinogringos.se'],
      },
    ],
  }
  if (page.featuredImage) {
    structuredData.image = {
      '@id': 'https://casinogringos.se/#primaryimage',
    }
  }
  if (page.reviewer) {
    structuredData.reviewedBy = {
      '@type': 'Person',
      name: page.reviewer.firstName + ' ' + page.reviewer.lastName,
      email: page.reviewer.email,
      jobTitle: page.reviewer.role,
      description: portableTextToPlainText(page.reviewer.description),
      url: `https://casinogringos.se/om-oss/${page.reviewer.slug.current}`,
      sameAs: [page.reviewer.linkedIn],
    }
  }
  return structuredData
}
