import { SubPageSchemaType } from '@/src/schemas/subPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'

export const getFeaturedImageStructuredData = (
  page: SubPageSchemaType | GuidePageSchemaType | SlotPageSchemaType
) => {
  if (!page.featuredImage) return null

  return {
    '@type': 'ImageObject',
    '@id': 'https://casinogringos.se/nya-casinon#primaryimage',
    url: page.featuredImage.src,
    width: 512,
    height: 512,
    caption: 'Nya casinon',
    inLanguage: 'sv-SE',
  }
}
