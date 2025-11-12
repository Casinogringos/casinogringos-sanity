import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import PageService from '@/src/services/SubPageService'

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

  const pagePath =
    typeof page.slug === 'string' ? page.slug : page.slug?.current || ''
  const pageUrl = `https://casinogringos.se/${pagePath}`.replace(
    /([^:]\/)\/+/g,
    '$1'
  )

  const reviewedBy = page.reviewer && {
    '@type': 'Person',
    name: `${page.reviewer.firstName} ${page.reviewer.lastName}`,
    jobTitle: page.reviewer.role,
    description: portableTextToPlainText(page.reviewer.description),
    url: `https://casinogringos.se/om-oss/${page.reviewer.slug?.current || page.reviewer.slug}`,
    ...(page.reviewer.linkedIn ? { sameAs: [page.reviewer.linkedIn] } : {}),
  }

  const structuredData: Record<string, string | object | number> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.seoTitle,
    description: page.seoDescription,
    inLanguage: 'sv-SE',
    ...(publishedAt && { datePublished: new Date(publishedAt).toISOString()}),
    ...(modifiedAt && { dateModified: new Date(modifiedAt).toISOString()}),
    isPartOf: { '@id': 'https://casinogringos.se/#website' },
    about: { '@id': 'https://casinogringos.se/#organization' },
    ...(page?.seoImage?.src && {
      image: {
        '@type': 'ImageObject',
        '@id': `${pageUrl}#primaryimage`,
        url: page.seoImage.src,
        inLanguage: 'sv-SE',
        ...(page.seoImage?.alt?.trim()
          ? { alternateName: page.seoImage.alt.trim() }
          : {}),
      },
      primaryImageOfPage: { '@id': `${pageUrl}#primaryimage` },
      thumbnailUrl: page.seoImage.src,
    }),
    ...(reviewedBy && { reviewedBy }),
    potentialAction: [{ '@type': 'ReadAction', target: [pageUrl] }],
  }
  return structuredData
}
