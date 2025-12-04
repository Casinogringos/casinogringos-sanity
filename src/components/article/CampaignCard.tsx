import Heading from '@/src/components/content/Heading'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import Image from 'next/image'
import Link from 'next/link'

const CampaignCard = ({
  item,
  className = '',
  cardBackground = false,
}: {
  item: NewsPagePreviewSchemaType
  className?: string
  cardBackground?: boolean
}) => {
  if (!item.slug?.current) {
    return null
  }

  return (
    <Link
      href={`/nyheter/${item.slug.current}`}
      prefetch={false}
      className={`${className} flex-shrink-0  md:w-auto md:first:pl-0 flex h-full md:last:border-0 md:pr-2 md:pl-1 gap-x-3 items-center not-prose md:border-r md:border-darklight ${cardBackground ? 'bg-white' : ''}`}
    >
      <div className="relative flex size-[55px] min-w-[55px] items-center rounded-full overflow-hidden">
        <Image
          src={item.featuredImage?.src}
          alt={item.featuredImage?.alt}
          width={80}
          height={60}
          className="object-cover absolute w-full h-full"
        />
      </div>
      <div className="py-2">
        <span className="block mb-0.5 text-xs text-primary">Nyhet</span>
        <Heading
          level={3}
          text={
            item.title?.length > 55 ? `${item.title.slice(0, 55)}…` : item.title
          }
          className="text-slate-100 hover:text-gray-600 !text-[13px] leading-4 font-bold"
        />
      </div>
    </Link>
  )
}

export default CampaignCard
