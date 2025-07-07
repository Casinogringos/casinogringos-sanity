import { Author } from '@/src/types'
import { AuthorSchema } from '@/src/schemas'
import fs from 'fs'

const getProfileStructuredData = (author: Author) => {
  const parse = AuthorSchema.safeParse(author)
  if (!parse.success) {
    console.error(`Invalid profile structured data:\n${author.name}\n`, parse.error)
    fs.writeFileSync('structuredDataError.log', `\n\n${author.name}\n${JSON.stringify(parse.error)}`)
    return null
  }

  return {
    "@type": "ProfilePage",
    "@id": `https://casinogringos.se/om-oss/${author.slug.current}`,
    "url": `https://casinogringos.se/om-oss/${author.slug.current}`,
    "name": author.title,
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