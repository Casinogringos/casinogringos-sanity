import { AuthorSchemaType } from '@/src/schemas'

export const getPersonStructuredData = (author: AuthorSchemaType) => {
  if (!author) return null

  return {
    '@type': 'Person',
    '@id': `https://casinogringos.se/#/schema/person/${author._id}`,
    name: author.name,
    image: {
      '@type': 'ImageObject',
      inLanguage: 'sv-SE',
      '@id': 'https://casinogringos.se/#/schema/person/image/',
      url: author.image.url,
      contentUrl: author.image.url,
      caption: author.name,
    },
    description: author.description,
    url: `https://casinogringos.se/om-oss/${author.slug.current}`,
  }
}
