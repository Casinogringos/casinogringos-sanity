
import BasePageService from './BasePageService'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import { SlotPageSchema } from '@/src/schemas/slotPage'
import { SlotPagePreviewSchema } from '@/src/schemas/slotPagePreview'

class SlotPageService extends BasePageService<SlotPageSchemaType | SlotPagePreviewSchemaType> {
  validatePage(
    page: SlotPageSchemaType,
    preview: boolean = false
  ): boolean {
    const parse = SlotPageSchema.safeParse(page)
    if (!parse.success) {
      // console.log(`Invalid page:\n${page.title}\n`, parse.error)
      // console.log('suspect page', page)
      return false
    }
    return true
  }

  validateList(pages: SlotPageSchemaType[] | SlotPagePreviewSchemaType[], preview: boolean = false): boolean {
    let parse = null
    for (const page of pages) {
      parse = SlotPagePreviewSchema.safeParse(page)
      // if (!parse) return false
      if (!parse.success) {
        console.log(`Invalid slot page:\n${page.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default SlotPageService
