import { toPlainText } from '@portabletext/react';
import { ModularContentItemSchemaType, ModularContentSchemaType } from '@/src/schemas/modularContent';
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'

abstract class BasePageService<PageType extends GuidePageSchemaType | SubPageSchemaType | SlotPageSchemaType | NewsPageSchemaType | CasinoPageSchemaType> {
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
    getModifiedDate(
        page: PageType
    ): string | null {
        const originalPublishedAt = page.originalPublishedAt ? new Date(page.originalPublishedAt).getTime() : null
        console.log('originalPublishedAt', originalPublishedAt)
        const originalModifiedAt = page.originalModifiedAt ? new Date(page.originalModifiedAt).getTime() : null
        console.log('originalModifiedAt', originalModifiedAt)
        const newCreatedAt = page._createdAt ? new Date(page._createdAt).getTime() : null
        console.log('newCreatedAt', newCreatedAt)
        const newUpdatedAt = page._updatedAt ? new Date(page._updatedAt).getTime() : null
        console.log('newUpdatedAt', newUpdatedAt)
        if (!originalPublishedAt || !originalModifiedAt || !newUpdatedAt || !newCreatedAt) return null
        if (newUpdatedAt > newCreatedAt) {
            return page._updatedAt
        }
        return page.originalModifiedAt ?? null
    }
}

export default BasePageService
