import { SubPageSchemaType } from '@/src/schemas/subPage'
import { urlFor } from '@/src/lib/client'

const getArticleStructuredData = (page: SubPageSchemaType) => {
  if (!page.author) return null
  const dev = process.env.DEV === 'true'
  let seoImage
  if (dev) {
    seoImage = page.seoImage?.src ? page.seoImage.src : ''
  } else {
    seoImage = page.seoImage.src
  }

  return {
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casinogringos.se/${page.slug.current}`,
    },
    headline: page.seoTitle,
    description: page.seoDescription,
    image: seoImage,
    author: {
      '@type': 'Organization',
      name: 'Casinogringos',
    },
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
  }
}

export default getArticleStructuredData
