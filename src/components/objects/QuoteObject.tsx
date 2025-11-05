import { QuoteObjectSchemaType } from '@/src/schemas/quoteObject'
import { PortableText } from 'next-sanity'

const QuoteObject = ({ object }: { object: QuoteObjectSchemaType }) => {
  return (
    <blockquote>
      {object.content.map((content, index) => (
        <div key={`content-${index}`}>
          <PortableText value={content} />
        </div>
      ))}
    </blockquote>
  )
}

export default QuoteObject
