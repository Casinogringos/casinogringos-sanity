import {
  GuidePagePreviewSchemaType,
  GuidePageSchema,
  GuidePageSchemaType,
} from '@/src/schemas'

import fs from 'fs'
import { GuidePagePreviewSchema } from '@/src/schemas/guidePagePreview'

class GuideService {
  validateGuidesList(
    guidePages: GuidePageSchemaType[] | GuidePagePreviewSchemaType[],
    preview: boolean = false
  ): boolean {
    let parse = null
    for (const item of guidePages) {
      parse = preview
        ? GuidePagePreviewSchema.safeParse(item)
        : GuidePageSchema.safeParse(item)
      if (!parse) return false
      if (!parse.success) {
        console.error(`Invalid guide page:\n${item.title}\n`, parse.error)
        fs.writeFileSync(
          'structuredDataError.log',
          `\n\n${item.title}\nInvalid Guide Page\n${JSON.stringify(parse.error)}`
        )
        return false
      }
    }
    return true
  }
}

export default GuideService
