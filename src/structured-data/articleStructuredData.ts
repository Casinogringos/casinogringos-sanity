import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SubPageSchemaType } from '@/src/schemas/subPage'
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

  console.log("PAGE", page)

  const pagePath =
  typeof page.slug === 'string' ? page.slug : page.slug?.current || '';

  const isHome = pagePath === '' || pagePath === '/';

  const pageUrl = isHome
    ? 'https://casinogringos.se/'
    : `https://casinogringos.se/${pagePath}`.replace(/([^:]\/)\/+/g, '$1');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: page.title ?? page.seoTitle,
    description: page.seoDescription,
    image: { '@id': `${pageUrl}#primaryimage` },
    publisher: { '@id': 'https://casinogringos.se/#organization' },
    datePublished: new Date(publishedAt).toISOString(),
    dateModified: new Date(modifiedAt).toISOString(),
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
    },
  };

  return structuredData
}

export default getArticleStructuredData
