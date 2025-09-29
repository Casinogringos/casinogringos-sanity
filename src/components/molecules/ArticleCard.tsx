import Link from 'next/link'
import Image from 'next/image'
import Date from '@/src/components/atoms/Date'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { PortableText } from 'next-sanity'
import GuidePageService from '@/src/services/GuidePageService'
import NewsPageService from '@/src/services/NewsPageService'
import Heading from '@/src/components/atoms/Heading'

const guidePageService = new GuidePageService()
const newsPageService = new NewsPageService()

const ArticleCard = ({
  item,
  excerpt = true,
}: {
  item: NewsPagePreviewSchemaType | GuidePagePreviewSchemaType
  excerpt?: boolean
}) => {
  const getUpdatedDate = () => {
    if (item._type === 'news-pages') {
      return newsPageService.getPagePublishedAtTimestamp(item)
    }
    if (item._type === 'guide-pages') {
      return guidePageService.getPagePublishedAtTimestamp(item)
    }
    return null
  }
  const publishedAt = getUpdatedDate()
  console.log('publishedAt', publishedAt)

  return (
    <Link
      href={item.slug.current}
      prefetch={false}
      className={'flex h-full bg-white pb-4 rounded-md flex-col items-start not-prose'}
    >
      <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
        <Image
          src={item.featuredImage.src}
          alt={item.featuredImage.alt}
          width={400}
          height={200}
          className="object-cover absolute w-full h-full"
        />
      </div>
      <div className="px-4">
        {publishedAt && <div className="mt-4 flex items-center gap-x-4 text-xs text-slate-500">
          <Date timestamp={publishedAt} />
        </div>}
        <Heading sizes={[4, 4, 5]} level={3} text={item.title} className="text-gray-900 hover:text-gray-600 my-2 font-bold leading-6" />
        {item._type === 'news-pages' && item.excerpt && excerpt && <PortableText value={item.excerpt} />}
      </div>
    </Link>
  )
}

export default ArticleCard
