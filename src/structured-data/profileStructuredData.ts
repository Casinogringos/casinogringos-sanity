import { portableTextToPlainText } from '@/src/lib/utils'
import { AuthorSchemaType } from '@/src/schemas/author'

const getProfileStructuredData = (author: AuthorSchemaType) => {

  const profileUrl = `https://casinogringos.se/om-oss/${author.slug.current}`

  return {
    "@type": "ProfilePage",
    "@id": `${profileUrl}#webpage`,
    "url": profileUrl,
    "name": author.firstName + ' ' + author.lastName,
    "description": portableTextToPlainText(author.description),
    "isPartOf": {
      "@id": "https://casinogringos.se/#website"
    },
    "inLanguage": "sv-SE",
    "mainEntity": {
      "@type": "Person",
      "@id": `${profileUrl}#person`,
      "name": `${author.firstName} ${author.lastName}`,
      "url": profileUrl,
      "description": portableTextToPlainText(author.description),
      ...(author.avatar?.src && {
        "image": {
          "@type": "ImageObject",
          "@id": `${profileUrl}#person-image`,
          "url": author.avatar.src
        }
      })
    },
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": [profileUrl]
      }
    ]
  }
}

export default getProfileStructuredData