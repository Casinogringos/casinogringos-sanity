import {
  GuidePagePreviewSchemaType,
  GuidePageSchema,
  GuidePageSchemaType,
} from '@/src/schemas'

import fs from 'fs'
import { GuidePagePreviewSchema } from '@/src/schemas/guidePagePreview'
import BasePageService from './BasePageService'

class GuideService extends BasePageService {
  validatePage(page: GuidePageSchemaType | GuidePagePreviewSchemaType, preview: boolean): boolean {
    const parse = preview
      ? GuidePagePreviewSchema.safeParse(page)
      : GuidePageSchema.safeParse(page)
    if (!parse.success) {
      console.log(`Invalid guide page:\n${page.title}\n`, parse.error)
      // return false
    }
    return true
  }
  validateGuidesList(
    guidePages: GuidePageSchemaType[] | GuidePagePreviewSchemaType[],
    preview: boolean = false
  ): boolean {
    let parse = null
    for (const item of guidePages) {
      parse = preview
        ? GuidePagePreviewSchema.safeParse(item)
        : GuidePageSchema.safeParse(item)
      // if (!parse) return false
      if (!parse.success) {
        console.log(`Invalid guide page:\n${item.title}\n`, parse.error)
        // return false
      }
    }
    return true
  }
}

export default GuideService
