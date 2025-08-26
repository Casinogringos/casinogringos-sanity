import { GuidePageSchemaType } from '@/src/schemas/guidePage'
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
    headline: page.seoTitle,
    description: page.seoDescription,
    image: urlFor(page.seoImage),
    author: {
      '@type': 'Person',
      name: page.author.firstName + ' ' + page.author.lastName,
      url: `https://casinogringos.se/om-oss/${page.author.slug.current}`,
      sameAs: [page.author.linkedIn],
    },
    reviewedBy: {
      '@type': 'Person',
      name: page.reviewer.firstName + ' ' + page.reviewer.lastName,
      url: `https://casinogringos.se/om-oss/${page.reviewer.slug.current}`,
      sameAs: [page.reviewer.linkedIn],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casinogringos',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casinogringos.se/casinogringos.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se/${page._type === 'guide-page' ? 'guider' : 'nyheter'}/${page.slug.current}`,
    },
    datePublished: page.originalPublishedAt ?? page._createdAt,
    dateModified: page._updatedAt ?? page.originalModifiedAt,
  }
}
