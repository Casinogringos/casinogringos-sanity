import { HTMLObjectSchemaType } from '@/src/schemas'

const HTMLObject = ({ object }: { object: HTMLObjectSchemaType }) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: object.renderedHtml }}
        />
    )
}

export default HTMLObject
