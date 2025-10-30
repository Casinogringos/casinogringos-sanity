import { SubPageSchemaType } from '@/src/schemas/subPage'
import { portableTextToPlainText } from '@/src/lib/utils'
import { CasinoPagePreviewSchemaType } from '../schemas/casinoPagePreview'

export const getItemListStructuredData = (page: SubPageSchemaType) => {
  const { toplist } = page
  if (!toplist) return null

  return {
    "@type": "ItemList",
    "@id": "https://casinogringos.se/nya-casinon#itemlist",
    "name": page.title,
    "itemListOrder": "http://schema.org/ItemListOrderAscending",
    "numberOfItems": 15,
    "itemListElement": toplist.casinos.map((casino: CasinoPagePreviewSchemaType, i: number) => {
      return {
        "@type": "ListItem",
        "position": i + 1,
        "name": casino.title,
        "url": `https://casinogringos.se${casino.slug.current}`,
        "item": {
          "@id": `https://casinogringos.se${casino.slug.current}`,
          "url": `https://casinogringos.se${casino.slug.current}`,
        },
      }
    })
  }
}
