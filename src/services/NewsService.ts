import { SubPage } from '@/src/types'
import { Object as ObjectType } from '@/src/types'
import { GuidePageSchemaType, SubPageSchema, SubPageSchemaType, CasinoPageSchemaType, NewsPageSchemaType, GuidePageSchema, CasinoPageSchema, NewsPageSchema } from '@/src/schemas'
import fs from 'fs'
import BasePageService from '@/src/services/BasePageService'

class NewsService extends BasePageService {
  validatePage(newsPages: NewsPageSchemaType[], preview: boolean): boolean {
    let parse = null
    for (const page of newsPages) {
      parse = preview ? NewsPagePreviewSchema.safeParse(page) : NewsPageSchema.safeParse(page)
      // if (!parse) return false
      if (!parse.success) {
        console.log(`Invalid news page:\n${page.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default NewsService