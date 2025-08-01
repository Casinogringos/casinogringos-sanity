import { toPlainText } from '@portabletext/react';
import { CasinoPageSchemaType, GuidePageSchemaType, ModularContentSchemaType, NewsPageSchemaType, SubPageSchemaType, SlotPageSchemaType } from "@/src/schemas"
import { ModularContentItemSchemaType } from '@/src/schemas/modularContent';

abstract class BasePageService<PageType> {
    abstract validatePage(page: PageType, preview: boolean): boolean

    abstract validateList(pages: PageType[], preview: boolean): boolean

    getHeadingObjects(
        page: PageType
    ) {
        const { content }: { content: ModularContentSchemaType } = page as GuidePageSchemaType | SubPageSchemaType | SlotPageSchemaType | NewsPageSchemaType | CasinoPageSchemaType
        return content.filter((object) => {
            return object._type === 'heading-object'
        })
    }

    getWordCount(
        page: PageType
    ) {
        const { content }: { content: ModularContentSchemaType } = page as GuidePageSchemaType | SubPageSchemaType | SlotPageSchemaType | NewsPageSchemaType | CasinoPageSchemaType
        return content.reduce((acc: number, object: ModularContentItemSchemaType) => {
            if (object._type === 'heading-object') {
                return acc + object.text.split(' ').length
            }
            if (object._type === 'paragraph-object') {
                const plainText = toPlainText(object.content)
                return acc + plainText.split(' ').length
            }
            return acc
        }, 0)
    }
}

export default BasePageService
