import { FlamingoRatingBlock } from '@/src/types'
import dynamic from 'next/dynamic'
import StarIcon from '@/src/app/components/icons/StarIcon'
import HalfStarIcon from '@/src/app/components/icons/HalfStarIcon'
const Heading = dynamic(() => import('@/src/app/components/atoms/Heading'))
const Paragraph = dynamic(() => import('@/src/app/components/atoms/Paragraph'))

const RatingBox = ({
  block,
  className,
}: {
  block: FlamingoRatingBlock
  className?: string
}) => {
  const { motivation, title } = block
  const rating = parseInt(block.rating)

  return (
    <div className={`${className} rounded-md mt-12`}>
      <div className={'mb-3 flex items-center justify-between'}>
        <Heading
          attributes={{ level: 2, text: title }}
          className={'!my-0 mr-3 !text-3xl'}
        />
        <div className="mt-1 flex">
          {new Array(rating).fill(null).map((value, index) => (
            <StarIcon
              key={`rating-star-${index}`}
              className="size-4 text-yellow400"
            />
          ))}
          {new Array(rating)
            .fill('')
            .map(
              (value, index) =>
                rating.toString().indexOf('.') !== -1 && (
                  <HalfStarIcon
                    key={`rating-star-${index}`}
                    className="h-4 w-4 text-yellow400"
                  />
                )
            )}
        </div>
      </div>
      {motivation && (
        <div className="rounded-md bg-slate100 p-4">
          <div className="mb-1 text-sm font-bold text-black">
            Motivering till betyget:
          </div>
          <Paragraph content={motivation} className={'!my-0'} />
        </div>
      )}
    </div>
  )
}

export default RatingBox
