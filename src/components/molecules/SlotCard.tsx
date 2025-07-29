import Link from '@/src/components/atoms/Link'
import { SlotPagePreviewSchemaType } from '@/src/schemas'
import Image from 'next/image'

const SlotCard = ({ slot }: { slot: SlotPagePreviewSchemaType }) => {
  return (
    <Link prefetch={false} className="mb-6" href={`${slot.slug.current}`}>
      <div className="relative mb-2 flex h-28 w-full overflow-hidden rounded-sm lg:h-40">
        <Image
          width={600}
          height={500}
          src={slot.featuredImage.src}
          alt={slot.featuredImage.alt}
          className={'min-h-full min-w-full object-cover'}
        />
      </div>
      <span className="text-sm font-semibold text-heading">{slot.title}</span>
    </Link>
  )
}

export default SlotCard
