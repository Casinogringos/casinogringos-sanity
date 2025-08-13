import { AuthorSchemaType } from '@/src/schemas/author'

const getProfileStructuredData = (author: AuthorSchemaType) => {

  return {
    "@type": "ProfilePage",
    "@id": `https://casinogringos.se/om-oss/${author.slug.current}`,
    "url": `https://casinogringos.se/om-oss/${author.slug.current}`,
    "name": author.firstName + ' ' + author.lastName,
    "isPartOf": {
      "@id": "https://casinogringos.se/#website"
    },
    "description": author.description,
    "inLanguage": "sv-SE",
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": [
          `https://casinogringos.se/om-oss/${author.slug.current}`
        ]
      }
    ]
  }
}

export default getProfileStructuredData