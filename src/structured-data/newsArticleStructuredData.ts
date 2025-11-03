import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { urlFor } from '@/src/lib/client'
import NewsPageService from '@/src/services/NewsPageService'

const getNewsArticleStructuredData = (page: NewsPageSchemaType) => {
  const newsPageService = new NewsPageService()
  const publishedAt = newsPageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = newsPageService.getPageModifiedAtTimestamp(page)

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: page.seoTitle,
    description: page.seoDescription,
    image: page.featuredImage.src,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      url: 'https://casinogringos.se',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se${page.slug.current}`,
    },
  }
}

export default getNewsArticleStructuredData
