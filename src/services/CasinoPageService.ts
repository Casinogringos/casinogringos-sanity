import { CasinoPagePreviewSchema, CasinoPagePreviewSchemaType, CasinoPageSchema, CasinoPageSchemaType } from '@/src/schemas'
import fs from 'fs'
import BasePageService from '@/src/services/BasePageService'

class CasinoPageService extends BasePageService<CasinoPageSchemaType> {
  constructor() {
    super()
  }
  validatePage(page: CasinoPageSchemaType, preview: boolean = false) {
    const parse = CasinoPageSchema.safeParse(page)
    if (!parse.success) {
      console.log(`Invalid casino page schema:\n${page.title}\n`, parse.error)
      fs.writeFileSync('structuredDataError.log', `\n\n${page.title}\n${JSON.stringify(parse.error)}`)
      // return false
    }
    return true
  }
  validateList(pages: CasinoPageSchemaType[] | CasinoPagePreviewSchemaType[], preview: boolean = false) {
    let parse = null
    for (const page of pages) {
      parse = preview ? CasinoPagePreviewSchema.safeParse(page) : CasinoPageSchema.safeParse(page)
      // if (!parse) return false
      if (!parse.success) {
        console.log(`Invalid casino page schema:\n${page.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default CasinoPageService
