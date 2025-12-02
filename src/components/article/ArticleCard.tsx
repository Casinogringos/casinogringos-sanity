import Date from '@/src/components/content/Date'
import Heading from '@/src/components/content/Heading'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import GuidePageService from '@/src/services/GuidePageService'
import NewsPageService from '@/src/services/NewsPageService'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

const guidePageService = new GuidePageService()
const newsPageService = new NewsPageService()

const ArticleCard = ({
  item,
  excerpt = true,
  className = '',
  cardBackground = false,
}: {
  item: NewsPagePreviewSchemaType | GuidePagePreviewSchemaType
  excerpt?: boolean
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
      href={item.slug.current}
      prefetch={false}
      className={`${className} flex h-full pb-4 rounded-md flex-col items-start not-prose ${cardBackground ? 'bg-white' : ''}`}
    >
      <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
        <Image
          src={item.featuredImage?.src}
          alt={item.featuredImage?.alt}
          width={400}
          height={200}
          className="object-cover absolute w-full h-full"
        />
      </div>
      <div className={`${cardBackground ? 'px-4' : ''}`}>
        {publishedAt && (
          <div className="mt-4 flex items-center gap-x-4 text-xs text-slate-500">
            <Date timestamp={publishedAt} />
          </div>
        )}
        <Heading
          sizes={[3, 3, 4]}
          level={3}
          text={item.title}
          className="text-gray-900 hover:text-gray-600 my-2 font-bold leading-6"
        />
        {item._type === 'news-pages' && item.excerpt && excerpt && (
          <div className="text-gray-500 text-sm line-clamp-3">
            <PortableText value={item.excerpt} />
          </div>
        )}
      </div>
    </Link>
  )
}

export default ArticleCard
