import { AuthorSchemaType } from '@/src/schemas/author'
import { portableTextToPlainText } from '@/src/lib/utils'

export const getPersonStructuredData = (author: AuthorSchemaType) => {
  if (!author) return null

  return {
    '@type': 'Person',
    '@id': `https://casinogringos.se/#/schema/person/${author._id}`,
    name: author.firstName + ' ' + author.lastName,
    image: {
      '@type': 'ImageObject',
      inLanguage: 'sv-SE',
      '@id': 'https://casinogringos.se/#/schema/person/image',
      url: author.avatar?.src,
      contentUrl: author.avatar?.src,
      caption: author.firstName + ' ' + author.lastName,
    },
    description: portableTextToPlainText(author.description),
    url: `https://casinogringos.se/om-oss/${author.slug.current}`,
  }
}
