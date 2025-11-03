import { SubPageSchemaType } from '@/src/schemas/subPage'
import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
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

  const dev = process.env.DEV === 'true'
  let seoImage
  if (dev) {
    seoImage = page.seoImage?.src ? page.seoImage.src : ''
  } else {
    seoImage = page.seoImage.src
  }

  const structuredData = {
    '@type': 'Article',
    '@id': 'https://casinogringos.se/#article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.SITE_URL}${page.slug.current}`,
    },
    headline: page.seoTitle,
    description: page.seoDescription,
    image: { '@id': 'https://casinogringos.se/#primaryimage' },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    datePublished: new Date(publishedAt ?? page._createdAt).toISOString(),
    dateModified: new Date(modifiedAt ?? page._updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      email: page.author.email,
      jobTitle: page.author.role,
      description: portableTextToPlainText(page.author.description),
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      image: page.author.avatar.src,
      sameAs: [page.author.linkedIn],
    },
  }

  return structuredData
}

export default getArticleStructuredData
