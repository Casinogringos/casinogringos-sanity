import { SubPageSchemaType } from '@/src/schemas/subPage'
import { portableTextToPlainText } from '@/src/lib/utils'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'

const getGameStructuredData = (page: SubPageSchemaType | GuidePageSchemaType | NewsPageSchemaType | SlotPageSchemaType) => {
  const dev = process.env.DEV === 'true'
  let seoImage
  if (dev) {
    seoImage = page.seoImage?.src ? page.seoImage.src : ''
  } else {
    seoImage = page.seoImage.src
  }

  const structuredData = {
    "@type": "Game",
    "@id": `https://casinogringos.se${page.slug.current}#game`,
    "name": page.title,
    "image": { "@id": `https://casinogringos.se${page.slug.current}#primaryimage` },
    "genre": ["Slot", "Megaways"],
    "isPartOf": { "@id": "https://casinogringos.se/#website" },
    "provider": { "@type": "Organization", "name": "Microgaming" },
  }
}

export default getGameStructuredData
