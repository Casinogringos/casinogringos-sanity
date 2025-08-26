import fs from 'fs'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'
import { CasinoPageSchema } from '@/src/schemas/casinoPage'
import { CasinoPagePreviewSchema } from '@/src/schemas/casinoPagePreview'
import BasePageService from '@/src/services/BasePageService'

class CasinoPageService extends BasePageService<CasinoPageSchemaType | CasinoPagePreviewSchemaType> {
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
