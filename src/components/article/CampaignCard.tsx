import Heading from '@/src/components/content/Heading'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import GuidePageService from '@/src/services/GuidePageService'
import NewsPageService from '@/src/services/NewsPageService'
import Image from 'next/image'
import Link from 'next/link'

const guidePageService = new GuidePageService()
const newsPageService = new NewsPageService()

const CampaignCard = ({
  item,
  className = '',
  cardBackground = false,
}: {
  item: NewsPagePreviewSchemaType | GuidePagePreviewSchemaType
  className?: string
  cardBackground?: boolean
}) => {
  const getPublishedDate = () => {
    if (item._type === 'news-pages') {
      return newsPageService.getPagePublishedAtTimestamp(item)
    }
    if (item._type === 'guide-pages') {
      return guidePageService.getPagePublishedAtTimestamp(item)
    }
    return null
  }
  const publishedAt = getPublishedDate()

  if (!item.slug?.current) {
    return null
  }

  return (
    <Link
      href={`/nyheter/${item.slug.current}`}
      prefetch={false}
      className={`${className} md:first:pl-0 flex h-full md:last:border-0 md:pr-2 md:pl-1 gap-x-3 items-center not-prose md:border-r md:border-slate-200 ${cardBackground ? 'bg-white' : ''}`}
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
        <span className="block mb-0.5 text-xs text-slate-500">Kampanj</span>
        <Heading
          level={3}
          text={
            item.title?.length > 50 ? `${item.title.slice(0, 45)}…` : item.title
          }
          className="text-gray-900 hover:text-gray-600 !text-sm font-bold"
        />
      </div>
    </Link>
  )
}

export default CampaignCard
