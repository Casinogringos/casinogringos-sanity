import Link from '@/src/components/atoms/Link'
import { SlotPage } from '@/src/types'

const SlotCard = ({ slot }: { slot: SlotPage<false> }) => {
  return (
    <Link prefetch={false} className="mb-6" href={`${slot.slug.current}`}>
      {/*<div className="relative mb-2 flex h-28 w-full overflow-hidden rounded-sm lg:h-40">*/}
      {/*<Image*/}
      {/*  width={600}*/}
      {/*  height={500}*/}
      {/*  src={slot.featuredImage?.slot.sourceUrl}*/}
      {/*  alt={slot.featuredImage?.slot.altText}*/}
      {/*  className={'min-h-full min-w-full object-cover'}*/}
      {/*/>*/}
      {/*</div>*/}
      <span className="text-sm font-semibold text-heading">{slot?.title}</span>
      {/*<div className="text-slate-500 text-xs font-medium">*/}
      {/*  {slot?.slotType?.speltillverkare?.edges[0].slot.name}*/}
      {/*</div>*/}
    </Link>
  )
}

export default SlotCard
