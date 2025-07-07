import AuthorService from '@/src/services/AuthorService'
import { AuthorSchemaType } from '@/src/schemas'

const authorService = new AuthorService()

export const getPersonStructuredData = (author: AuthorSchemaType) => {
  const isValid = authorService.validateSchema(author)
  if (!isValid) return null

  return {
    "@type": "Person",
    "@id": `https://casinogringos.se/#/schema/person/${author._id}`,
    "name": author.name,
    "image": {
      "@type": "ImageObject",
      "inLanguage": "sv-SE",
      "@id": "https://casinogringos.se/#/schema/person/image/",
      "url": author.image.url,
      "contentUrl": author.image.url,
      "caption": author.name
    },
    "description": author.description,
    "url": `https://casinogringos.se/om-oss/${author.slug.current}`,
  }
}