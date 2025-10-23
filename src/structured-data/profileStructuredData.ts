import { AuthorSchemaType } from '@/src/schemas/author'
import { portableTextToPlainText } from '@/src/lib/utils'

const getProfileStructuredData = (author: AuthorSchemaType) => {

  return {
    "@type": "ProfilePage",
    "@id": `https://casinogringos.se/om-oss/${author.slug.current}`,
    "url": `https://casinogringos.se/om-oss/${author.slug.current}`,
    "name": author.firstName + ' ' + author.lastName,
    "isPartOf": {
      "@id": "https://casinogringos.se/#website"
    },
    "description": portableTextToPlainText(author.description),
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