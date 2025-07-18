import Link from 'next/link'
import SanityImage from '@/src/components/atoms/SanityImage'
import Date from '@/src/components/atoms/Date'
import { NewsPageSchemaType } from '@/src/schemas'
import { PortableText } from 'next-sanity'

const NewsCard = ({ item }: { item: NewsPageSchemaType }) => {
  return (
    <Link
      href={item.slug.current}
      prefetch={false}
      className={'flex h-full bg-white pb-4 rounded-md flex-col items-start'}
    >
      <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
        <SanityImage
          image={item?.featuredImage.image}
          altText={item?.featuredImage.image.alt}
          width={400}
          className={'min-h-full min-w-full object-cover'}
        />
      </div>
      <div className="px-4">
        <div className="mt-4 flex items-center gap-x-4 text-xs text-slate500">
          <Date dateString={item.originalPublishedAt ?? item._createdAt} />
        </div>
        <h3 className="text-gray900 group-hover:text-gray-600 mt-2 text-lg font-medium leading-6">
          <span />
          {item.title}
        </h3>
        {item?.excerpt && <PortableText value={item.excerpt} />}
      </div>
    </Link>
  )
}

export default NewsCard
