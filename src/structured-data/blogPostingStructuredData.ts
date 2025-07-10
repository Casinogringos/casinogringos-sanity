import { GuidePageSchemaType } from '../schemas/guidePage'
import { urlFor } from '@/src/lib/client'

export const getBlogPostingStructuredData = ({
  page,
}: {
  page: GuidePageSchemaType
}) => {
  if (!page.author || !page.reviewer) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.title,
    description: page.excerpt,
    image: urlFor(page.seoImage),
    author: {
      '@type': 'Person',
      name: page.author.name,
      url: `https://casinogringos.se/experter/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
    reviewedBy: {
      '@type': 'Person',
      name: page.reviewer.name,
      url: `https://casinogringos.se/experter/${page.reviewer.slug.current}`,
      sameAs: [page.reviewer.linkedIn],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://casinogringos.se/blogg/uttag-leovegas',
    },
    datePublished: page._createdAt,
    dateModified: page._updatedAt,
  }
}
