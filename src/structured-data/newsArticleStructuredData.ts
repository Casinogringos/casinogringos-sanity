import { NewsPageSchemaType } from '@/src/schemas'
import { urlFor } from '@/src/lib/client'

const getNewsArticleStructuredData = (page: NewsPageSchemaType) => {
  if (!page.author || !page.reviewer) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: page.seoTitle,
    description: page.seoDescription,
    image: urlFor(page.seoImage),
    datePublished: page.originalPublishedAt ?? page._createdAt,
    dateModified: page._updatedAt ?? page.originalModifiedAt,
    author: {
      '@type': 'Person',
      name: page.author.name,
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
      '@id': `https://casinogringos.se/nyheter/${page.slug.current}`,
    },
  }
}

export default getNewsArticleStructuredData
