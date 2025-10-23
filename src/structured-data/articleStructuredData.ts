import { SubPageSchemaType } from '@/src/schemas/subPage'
import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import PageService from '@/src/services/SubPageService'

const pageService = new PageService()

const getArticleStructuredData = (page: SubPageSchemaType | GuidePageSchemaType | NewsPageSchemaType) => {
  const publishedAt = pageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = pageService.getPageModifiedAtTimestamp(page)

  const dev = process.env.DEV === 'true'
  let seoImage
  if (dev) {
    seoImage = page.seoImage?.src ? page.seoImage.src : ''
  } else {
    seoImage = page.seoImage.src
  }

  const structuredData = {
    '@type': 'Article',
    "@id": "https://casinogringos.se/#article",
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.SITE_URL}${page.slug.current}`,
    },
    headline: page.seoTitle,
    description: page.seoDescription,
    image: { "@id": "https://casinogringos.se/#primaryimage" },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    datePublished: new Date(publishedAt).toISOString(),
    dateModified: new Date(modifiedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      email: page.author.email,
      jobTitle: page.author.role,
      description: portableTextToPlainText(page.author.description),
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      image: page.author.avatar.src,
      sameAs: [page.author.linkedIn],
    }
  }

  return structuredData
}

export default getArticleStructuredData
