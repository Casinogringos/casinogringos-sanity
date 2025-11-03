import { NewsPageSchemaType } from '@/src/schemas/newsPage';

const getNewsArticleStructuredData = (page: NewsPageSchemaType) => {

  const publishedAt = page.originalPublishedAt || page._createdAt;
  const modifiedAt  = page._updatedAt || page.originalModifiedAt;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: page.seoTitle,
    description: page.seoDescription,
    image: page.featuredImage.src,
    datePublished: new Date(publishedAt).toISOString(),
    dateModified: new Date(modifiedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: page.author.name,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
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
}

export default getNewsArticleStructuredData
