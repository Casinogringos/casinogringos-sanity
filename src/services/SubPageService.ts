import {
  SubPageSchema,
  SubPageSchemaType,
} from '@/src/schemas'
import BasePageService from '@/src/services/BasePageService'
import _ from 'lodash'

class SubPageService extends BasePageService<SubPageSchemaType> {
  validatePage(
    page: SubPageSchemaType,
    preview: boolean = false
  ): boolean {
    const parse = SubPageSchema.safeParse(page)
    if (!parse.success) {
      console.log(`Invalid page:\n${page.title}\n`, parse.error.format())
      console.log('suspect page', page)
      for (const err of parse.error.errors) {
        if (err.code === 'invalid_union_discriminator') {
          const offendingObject = _.get(page, err.path);
          console.log('Offending object:', offendingObject);
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
        console.log(`Invalid page:\n${page.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default SubPageService
