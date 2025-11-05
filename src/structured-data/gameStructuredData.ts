import { SubPageSchemaType } from '@/src/schemas/subPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'

const getGameStructuredData = (
  page:
    | SubPageSchemaType
    | GuidePageSchemaType
    | NewsPageSchemaType
    | SlotPageSchemaType
) => {
  const structuredData = {
    '@type': 'Game',
    '@id': `https://casinogringos.se${page.slug.current}#game`,
    name: page.title,
    image: {
      '@id': `https://casinogringos.se${page.slug.current}#primaryimage`,
    },
    genre: ['Slot', 'Megaways'],
    isPartOf: { '@id': 'https://casinogringos.se/#website' },
    provider: { '@type': 'Organization', name: 'Microgaming' },
  }
  return structuredData
}

export default getGameStructuredData
