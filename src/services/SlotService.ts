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

class SlotService extends BasePageService {
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
}

export default SlotService
