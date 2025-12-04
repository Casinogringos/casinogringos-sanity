import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import NewsPageService from '@/src/services/NewsPageService'

const getNewsArticleStructuredData = (page: NewsPageSchemaType) => {
  const newsPageService = new NewsPageService()
  const publishedAt = newsPageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = newsPageService.getPageModifiedAtTimestamp(page)
  const wordCount = newsPageService.getWordCount(page)
  const structuredData: Record<string, string | object | number> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: page.seoTitle,
    description: page.seoDescription,
    image: page.featuredImage.src,
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
    wordCount: wordCount,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se${page.slug.current}#webpage`,
    },
    publisher: {
      '@id': 'https://casinogringos.se/#organization',
    },
    isPartOf: { '@id': 'https://casinogringos.se/#website' },
    about: { '@id': 'https://casinogringos.se/#organization' },
  }
  if (publishedAt) {
    structuredData['datePublished'] = new Date(publishedAt).toISOString()
  }
  if (modifiedAt) {
    structuredData['dateModified'] = new Date(modifiedAt).toISOString()
  }

  return structuredData
}

export default getNewsArticleStructuredData
