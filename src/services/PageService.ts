import {
  SubPageSchema,
  SubPageSchemaType,
} from '@/src/schemas'
import BasePageService from '@/src/services/BasePageService'

class PageService extends BasePageService {
  validatePage(
    page: SubPageSchemaType,
    preview: boolean = false
  ): boolean {
    const parse = SubPageSchema.safeParse(page)
    if (!parse.success) {
      console.log(`Invalid page:\n${page.title}\n`, parse.error)
      console.log('suspect page', page)
      // return false
    }
    return true
  }
}

export default PageService
