import { SubPage } from '@/src/types'
import { Object as ObjectType } from '@/src/types'

class PageService {
  getHeadingObjects(page: SubPage) {
    const {content} = page
    return content.filter((object: ObjectType) => {
      return object._type === 'heading-object'
    })
  }
  getWordCount(page: SubPage) {
    const {content} = page
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