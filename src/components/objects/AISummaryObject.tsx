import { AISummaryObject as AISummaryObjectType } from '@/src/types'
import { PortableText } from 'next-sanity'

const AISummaryObject = ({ object }: { object: AISummaryObjectType }) => {
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
