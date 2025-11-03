import { PortableText } from 'next-sanity'
import { AISummaryObjectSchemaType } from '@/src/schemas/aiSummaryObject'

const AISummaryObject = ({ object }: { object: AISummaryObjectSchemaType }) => {
  return (
    <section>
      {object.content.map((content, index) => (
        <div key={`content-${index}`}>
          <PortableText value={content} />
        </div>
      ))}
    </section>
  )
}

export default AISummaryObject
