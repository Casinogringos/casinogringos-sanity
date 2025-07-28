import { Object as ObjectType } from '@/src/types'
import {
  GuidePageSchemaType,
  SubPageSchema,
  SubPageSchemaType,
  CasinoPageSchemaType,
  NewsPageSchemaType,
  GuidePageSchema,
  CasinoPageSchema,
  NewsPageSchema,
  NewsPagePreviewSchema,
  SlotPageSchema,
  SlotPageSchemaType,
} from '@/src/schemas'
import BasePageService from './BasePageService'

class SlotPageService extends BasePageService<SlotPageSchemaType> {
  validatePage(
    page: SlotPageSchemaType,
    preview: boolean = false
  ): boolean {
    const parse = SlotPageSchema.safeParse(page)
    if (!parse.success) {
      console.log(`Invalid page:\n${page.title}\n`, parse.error)
      console.log('suspect page', page)
      return false
    }
    return true
  }

  validateList(pages: SlotPageSchemaType[], preview: boolean = false): boolean {
    let parse = null
    for (const page of pages) {
      parse = SlotPageSchema.safeParse(page)
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
