import { SubPageSchemaType } from '@/src/schemas/subPage'
import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'

const getArticleStructuredData = (page: SubPageSchemaType | GuidePageSchemaType | NewsPageSchemaType) => {
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
    image: seoImage,
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    datePublished: page.originalPublishedAt,
    dateModified: page._updatedAt ?? page.originalModifiedAt,
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      email: page.author.email,
      jobTitle: page.author.role,
      description: portableTextToPlainText(page.author.description),
      url: `https://casinogringos.se/om-oss/${page.author.slug}`,
      image: page.author.avatar.src,
      sameAs: [page.author.linkedIn],
    }
  }
  if (page.reviewer) {
    structuredData.reviewedBy = {
      '@type': 'Person',
      name: page.reviewer.firstName + ' ' + page.reviewer.lastName,
      email: page.reviewer.email,
      jobTitle: page.reviewer.role,
      description: portableTextToPlainText(page.reviewer.description),
      url: `https://casinogringos.se/om-oss/${page.reviewer.slug}`,
      sameAs: [page.reviewer.linkedIn],
    }
  }
}

export default getArticleStructuredData
