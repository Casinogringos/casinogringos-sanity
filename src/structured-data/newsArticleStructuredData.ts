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
      name: `${page.author.firstName} ${page.author.lastName}`,
      url: 'https://casinogringos.se/experter/lisa-andersson',
      sameAs: ['https://www.linkedin.com/in/lisaandersson'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      url: 'https://casinogringos.se',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se/nyheter/${page.slug.current}`,
    },
  }
}

export default getNewsArticleStructuredData
