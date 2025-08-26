import Link from 'next/link'
import Image from 'next/image'
import Date from '@/src/components/atoms/Date'
import {
  GuidePagePreviewSchemaType,
  NewsPagePreviewSchemaType,
} from '@/src/schemas'
import { PortableText } from 'next-sanity'
import GuidePageService from '@/src/services/GuidePageService'
import NewsPageService from '@/src/services/NewsPageService'

const guidePageService = new GuidePageService()
const newsPageService = new NewsPageService()

const ArticleCard = ({
  item,
}: {
  item: NewsPagePreviewSchemaType | GuidePagePreviewSchemaType
}) => {
  const publishedDate = guidePageService.getPublishedDate(item)
  console.log('item', item)
  return (
    <Link
      href={item.slug.current}
      prefetch={false}
      className={'flex h-full bg-white pb-4 rounded-md flex-col items-start'}
    >
      <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
        <Image
          src={item.featuredImage.src}
          alt={item.featuredImage.alt}
          width={400}
          height={200}
          className="object-cover"
        />
      </div>
      <div className="px-4">
        {publishedDate && <div className="mt-4 flex items-center gap-x-4 text-xs text-slate500">
          <Date dateString={publishedDate} />
        </div>}
        <h3 className="text-gray900 group-hover:text-gray-600 mt-2 text-lg font-medium leading-6">
          <span />
          {item.title}
        </h3>
      </div>
    </Link>
  )
}

export default ArticleCard
