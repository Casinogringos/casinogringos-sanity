import { SubPage } from '@/src/types'
import { Object as ObjectType } from '@/src/types'
import { GuidePageSchemaType, SubPageSchema, SubPageSchemaType, CasinoPageSchemaType, NewsPageSchemaType, GuidePageSchema, CasinoPageSchema, NewsPageSchema } from '@/src/schemas'

import fs from 'fs'

class PageService {
  validateSchema(page: SubPageSchemaType | CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType): boolean {
    let parse = null
    if (page._type === 'pages') {
      parse = SubPageSchema.safeParse(page)
    } else if (page._type === 'casino-pages') {
      parse = CasinoPageSchema.safeParse(page)
    } else if (page._type === 'guide-pages') {
      parse = GuidePageSchema.safeParse(page)
    } else if (page._type === 'news-pages') {
      parse = NewsPageSchema.safeParse(page)
    }
    if (!parse) return false
    if (!parse.success) {
      console.error(`Invalid page:\n${page.title}\n`, parse.error)
      fs.writeFileSync('structuredDataError.log', `\n\n${page.title}\nInvalid Page\n${JSON.stringify(parse.error)}`)
      return false
    }
    return true
  }
  getHeadingObjects(page: SubPageSchemaType | CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType) {
    const { content } = page
    return content.filter((object: ObjectType) => {
      return object._type === 'heading-object'
    })
  }
  getWordCount(page: SubPageSchemaType | CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType) {
    const { content } = page
    return content.reduce((acc, object: ObjectType) => {
      if (object._type === 'heading-object') {
        return acc + object.text
      }
      if (object._type === 'paragraph-object') {
        return acc + this.getParagraphWordCount(object)
      }
      // etc...
      return acc
    }, 0)
  }
}

export default PageService