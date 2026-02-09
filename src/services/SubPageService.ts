import { SubPageSchema, SubPageSchemaType } from '@/src/schemas/subPage'
import BasePageService from '@/src/services/BasePageService'
import { SubPagePreviewSchemaType } from '../schemas/subPagePreview'

class SubPageService extends BasePageService<SubPageSchemaType | SubPagePreviewSchemaType> {
  validatePage(
    page: SubPageSchemaType | SubPagePreviewSchemaType,
    preview: boolean = false
  ): boolean {
    const parse = SubPageSchema.safeParse(page)
    if (!parse.success) {
      // console.log(`Invalid page:\n${page.title}\n`, parse.error.format())
      for (const err of parse.error.errors) {
        if (err.code === 'invalid_union_discriminator') {
        }
      }
      // return false
    }
    return true
  }

  validateList(pages: SubPageSchemaType[], preview: boolean = false): boolean {
    let parse = null
    for (const page of pages) {
      parse = SubPageSchema.safeParse(page)
      // if (!parse) return false
      if (!parse.success) {
        // console.log(`Invalid page:\n${page.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default SubPageService
