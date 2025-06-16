import { QuoteObject as QuoteObjectType } from '@/src/types'
import { PortableText } from 'next-sanity'

const QuoteObject = ({ object }: { object: QuoteObjectType }) => {
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
