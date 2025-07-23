import { CasinoPageSchemaType, GuidePageSchemaType, ModularContentSchemaType, NewsPageSchemaType, SubPageSchemaType, SlotPageSchemaType } from "@/src/schemas"

abstract class BasePageService {
    abstract validatePage(page: SlotPageSchemaType | SubPageSchemaType | CasinoPageSchemaType | GuidePageSchemaType | NewsPageSchemaType, preview: boolean): boolean

    getHeadingObjects(
        page:
            | SubPageSchemaType
            | CasinoPageSchemaType
            | GuidePageSchemaType
            | NewsPageSchemaType
            | SlotPageSchemaType
    ) {
        const { content }: { content: ModularContentSchemaType } = page
        return content.filter((object) => {
            return object._type === 'heading-object'
        })
    }

    getWordCount(
        page:
            | SubPageSchemaType
            | CasinoPageSchemaType
            | GuidePageSchemaType
            | NewsPageSchemaType
            | SlotPageSchemaType
    ) {
        const { content }: { content: ModularContentSchemaType } = page
        return content.reduce((acc, object) => {
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

export default BasePageService
