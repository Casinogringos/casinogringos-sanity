import { Author } from '@/src/types'

export const getPersonStructuredData = (author: Author) => {
  return {
    "@type": "Person",
    "@id": `https://casinogringos.se/#/schema/person/${author.id}`,
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