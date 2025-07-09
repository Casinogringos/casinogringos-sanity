import { SubPage } from '@/src/types'
import { Object as ObjectType } from '@/src/types'
import { GuidePageSchemaType, SubPageSchema, SubPageSchemaType, CasinoPageSchemaType, NewsPageSchemaType, GuidePageSchema, CasinoPageSchema, NewsPageSchema } from '@/src/schemas'

import fs from 'fs'

class NewsService {
  validateSchema(newsPages: NewsPageSchemaType[]): boolean {
    let parse = null
    for (const item of newsPages) {
      parse = NewsPageSchema.safeParse(item)
      if (!parse) return false
      if (!parse.success) {
        console.error(`Invalid news page:\n${item.title}\n`, parse.error)
        fs.writeFileSync('structuredDataError.log', `\n\n${item.title}\nInvalid News Page\n${JSON.stringify(parse.error)}`)
        return false
      }
    }
    return true
  }
}

export default NewsService