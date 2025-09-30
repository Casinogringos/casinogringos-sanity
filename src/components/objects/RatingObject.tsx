import Heading from '@/src/components/atoms/Heading'
import { PortableText } from 'next-sanity'
import { RatingObjectSchemaType } from '@/src/schemas/ratingObject'
import { CasinoSchemaType } from '@/src/schemas/casino'
import StarIcon from '@/src/components/icons/StarIcon'
import HalfStarIcon from '@/src/components/icons/HalfStarIcon'

const RatingObject = ({ object, casino }: { object: RatingObjectSchemaType, casino: CasinoSchemaType }) => {
  console.log('rating object', object)
  const rating = casino.casinoRatings?.find((rating) => rating.ratingType === object.rating)?.rating
  if (!rating) return null

  return (
    <section>
      <div className='flex items-center justify-between mb-2'>
        <Heading text={object.title} size={6} className='not-prose font-bold' level={2} />
        <div className="flex">
          {Array.from({ length: Math.floor(rating) }).map((_, index) => (
            <StarIcon
              key={`rating-star-${index}`}
              className="text-yellow-400"
            />
          ))}
          {rating % 1 !== 0 && (
            <HalfStarIcon
              key="rating-star-half"
              className="text-yellow-400"
            />
          )}
        </div>
      </div>
      <div className='rounded-md bg-slate-100 p-4 not-prose'>
        <p className='font-bold'>Motivering till betyget:</p>
        <PortableText value={object.motivation} />
      </div>
    </section>
  )
}

export default RatingObject
