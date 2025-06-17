import { RatingObject as RatingObjectType } from '@/src/types'
import Heading from '@/src/components/atoms/Heading'
import { PortableText } from 'next-sanity'

const RatingObject = ({ object }: { object: RatingObjectType }) => {
  return (
    <section>
      <div>
        <Heading text={object.title} level={2} />
        {object.rating}
      </div>
      <PortableText value={object.motivation} />
    </section>
  )
}

export default RatingObject
