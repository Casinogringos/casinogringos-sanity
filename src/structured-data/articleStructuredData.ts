import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import NewsPageService from '@/src/services/NewsPageService'

const newsPageService = new NewsPageService()

const getArticleStructuredData = (
  page: GuidePageSchemaType | NewsPageSchemaType | SubPageSchemaType
) => {
  const publishedAt = newsPageService.getPagePublishedAtTimestamp(
    page as NewsPageSchemaType
  )
  const modifiedAt = newsPageService.getPageModifiedAtTimestamp(
    page as NewsPageSchemaType
  )
  const wordCount = newsPageService.getWordCount(page as NewsPageSchemaType)
  const dev = process.env.DEV === 'true'
  let seoImage
  if (dev) {
    seoImage = page.seoImage?.src ? page.seoImage.src : ''
  } else {
    seoImage = page.seoImage.src
  }

  const pagePath =
    typeof page.slug === 'string' ? page.slug : page.slug?.current || ''

  const isHome = pagePath === '' || pagePath === '/'

  const pageUrl = isHome
    ? 'https://casinogringos.se/'
    : `https://casinogringos.se/${pagePath}`.replace(/([^:]\/)\/+/g, '$1')

  const structuredData: Record<string, string | object | number> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: page.title ?? page.seoTitle,
    description: page.seoDescription,
    ...(publishedAt && { datePublished: new Date(publishedAt).toISOString()}),
    ...(modifiedAt && { dateModified: new Date(modifiedAt).toISOString()}),
    image: { '@id': `${pageUrl}#primaryimage` },
    publisher: { '@id': 'https://casinogringos.se/#organization' },
    author: {
      '@type': 'Person',
      name: `${page.author.firstName} ${page.author.lastName}`,
      email: page.author.email,
      jobTitle: page.author.role,
      description: portableTextToPlainText(page.author.description),
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      image: page.author.avatar.src,
      sameAs: [page.author.linkedIn],
    },
    wordCount: wordCount,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
    },
  }
  return structuredData
}

export default getArticleStructuredData
