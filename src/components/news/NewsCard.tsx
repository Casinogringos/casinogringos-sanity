import Link from 'next/link'
import Image from 'next/image'
import Date from '@/src/components/content/Date'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import NewsPageService from '@/src/services/NewsPageService'
import Heading from '@/src/components/content/Heading'

const newsPageService = new NewsPageService()

const NewsCard = ({ item, cardBackground }: { item: NewsPagePreviewSchemaType, cardBackground?: boolean }) => {
  const publishedAt = newsPageService.getPagePublishedAtTimestamp(item)

  return (
    <Link
      href={item.slug.current}
      prefetch={false}
      className={`flex h-full bg-white pb-4 rounded-md flex-col items-start`}
    >
      <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
        <Image
          src={item.featuredImage.src}
          alt={item.featuredImage.alt}
          width={400}
          height={200}
          className="object-cover h-full w-full absolute"
        />
      </div>
      <div className="px-4">
        {publishedAt && (
          <div className="mt-4 flex items-center gap-x-4 text-xs text-slate500">
            <Date timestamp={publishedAt} />
          </div>
        )}
        <Heading
          sizes={[2, 2, 3]}
          level={3}
          className="text-gray-900 group-hover:text-gray-600 mt-2 leading-6"
        >
          <span>{item.title}</span>
        </Heading>
      </div>
    </Link>
  )
}

export default NewsCard
