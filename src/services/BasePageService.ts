import { toPlainText } from '@portabletext/react';
import { ModularContentItemSchemaType, ModularContentSchemaType } from '@/src/schemas/modularContent';
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview';
import { SubPagePreviewSchemaType } from '@/src/schemas/subPagePreview';
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview';
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview';
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview';

abstract class BasePageService<PageType extends GuidePageSchemaType | GuidePagePreviewSchemaType | SubPageSchemaType | SubPagePreviewSchemaType | SlotPageSchemaType | SlotPagePreviewSchemaType | NewsPageSchemaType | NewsPagePreviewSchemaType | CasinoPageSchemaType | CasinoPagePreviewSchemaType> {
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
        if ((!originalPublishedAt && newCreatedAt) || (!originalModifiedAt && newUpdatedAt)) return null
        if (!newUpdatedAt) return page.originalModifiedAt ?? null
        if (newUpdatedAt && newCreatedAt && newUpdatedAt > newCreatedAt) {
            return page._updatedAt
        }
        return page.originalModifiedAt ?? null
    }
    getPublishedDate(
        page: PageType
    ): string | null {
        const originalPublishedAt = page.originalPublishedAt ? new Date(page.originalPublishedAt).getTime() : null
        const newCreatedAt = page._createdAt ? new Date(page._createdAt).getTime() : null
        if (!originalPublishedAt || !newCreatedAt) return null
        if (originalPublishedAt) {
            return page.originalPublishedAt ?? null
        }
        return page._createdAt ?? null
    }
}

export default BasePageService
