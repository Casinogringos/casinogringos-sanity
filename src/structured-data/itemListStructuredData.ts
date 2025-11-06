import { SubPageSchemaType } from '@/src/schemas/subPage'
import { CasinoSchemaType } from '@/src/schemas/casino'

export const getItemListStructuredData = (page: SubPageSchemaType) => {
  const { toplist } = page
  if (!toplist) return null

  return {
    '@type': 'ItemList',
    '@id': 'https://casinogringos.se/nya-casinon#itemlist',
    name: page.title,
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    numberOfItems: 15,
    itemListElement: toplist.casinos.map(
      (casino: CasinoSchemaType, i: number) => {
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'WebPage',
            name: casino.name,
            '@id': `https://casinogringos.se${casino.slug.current}`,
            url: `https://casinogringos.se${casino.slug.current}`,
          },
        }
      }
    ),
  }
}
