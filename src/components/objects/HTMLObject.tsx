import { HTMLObjectSchemaType } from '@/src/schemas/htmlObject'

const HTMLObject = ({ object }: { object: HTMLObjectSchemaType }) => {
  return <div dangerouslySetInnerHTML={{ __html: object.html }} />
}

export default HTMLObject
