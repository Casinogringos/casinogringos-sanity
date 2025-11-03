import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import NewsPageService from '@/src/services/NewsPageService'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'

export const getBlogPostingStructuredData = ({
  page,
}: {
  page: GuidePageSchemaType | NewsPageSchemaType
}) => {
  const newsPageService = new NewsPageService()
  const publishedAt = newsPageService.getPagePublishedAtTimestamp(
    page as NewsPageSchemaType
  )
  const modifiedAt = newsPageService.getPageModifiedAtTimestamp(
    page as NewsPageSchemaType
  )

  const structuredData: Record<string, object | string> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.seoTitle,
    description: page.seoDescription,
    image: page.seoImage.src,
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se/${page._type === 'guide-page' ? 'guider' : 'nyheter'}/${page.slug.current}`,
    },
    datePublished: new Date(publishedAt ?? page._createdAt).toISOString(),
    dateModified: new Date(modifiedAt ?? page._updatedAt).toISOString(),
  }
  if (page.reviewer) {
    structuredData.reviewedBy = {
      '@type': 'Person',
      name: page.reviewer.firstName + ' ' + page.reviewer.lastName,
      url: `https://casinogringos.se/om-oss/${page.reviewer.slug.current}`,
      sameAs: [page.reviewer.linkedIn],
    }
  }
  return structuredData
}
