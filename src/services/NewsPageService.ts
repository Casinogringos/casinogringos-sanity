import BasePageService from '@/src/services/BasePageService'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { NewsPageSchema } from '@/src/schemas/newsPage'
import { NewsPagePreviewSchema } from '@/src/schemas/newsPagePreview'

class NewsPageService extends BasePageService<NewsPageSchemaType | NewsPagePreviewSchemaType> {
  validatePage(page: NewsPageSchemaType, preview: boolean): boolean {
    let parse = null
    parse = preview ? NewsPagePreviewSchema.safeParse(page) : NewsPageSchema.safeParse(page)
    // if (!parse) return false
    if (!parse.success) {
      // console.log(`Invalid news page:\n${page.title}\n`, parse.error)
      // return false
    }
    return true
  }

  validateList(pages: NewsPageSchemaType[] | NewsPagePreviewSchemaType[], preview: boolean): boolean {
    let parse = null
    for (const page of pages) {
      parse = preview ? NewsPagePreviewSchema.safeParse(page) : NewsPageSchema.safeParse(page)
      // if (!parse) return false
      if (!parse.success) {
        // console.log(`Invalid news page:\n${page.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default NewsPageService