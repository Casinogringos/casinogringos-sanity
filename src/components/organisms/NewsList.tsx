import Link from 'next/link'
import { GuidePage, NewsPage } from '@/src/types'
import SanityImage from '@/src/components/atoms/SanityImage'
import Heading from '@/src/components/atoms/Heading'
import Date from '@/src/components/atoms/Date'

const NewsList =({
  items,
  itemComponent,
}: {
  items: NewsPage[] | GuidePage[]
  itemComponent: typeof NewsCard
}) => {
  const ItemComponent = itemComponent

  return (
    <div className={`bg-blue100 py-10 sm:py-20`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Heading level={2} text={'Senaste casinonyheter'} className="text-gray-900 text-3xl font-bold tracking-tight" />
        <p className="mt-4 text-slate600">
          Här hittar du de senaste nyheterna om online casino i Sverige. Vi
          håller oss alltid uppdaterade med vad som sker inom den svenska
          spelbranschen och skriver nyheter kontinuerligt för att hålla dig
          uppdaterad med det senaste inom casinovärlden.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 items-start gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-20">
          {items.map((item) => (
            <Link
              href={item.slug.current}
              key={item._key}
              prefetch={false}
              className={
                'flex h-full bg-white pb-4 rounded-md flex-col items-start'
              }
            >
              <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
                <SanityImage
                  image={item?.featuredImage.image}
                  altText={item?.featuredImage.altText}
                  width={400}
                  className={'min-h-full min-w-full object-cover'}
                />
              </div>
              <div className="px-4">
                <div className="mt-4 flex items-center gap-x-4 text-xs text-slate500">
                  <Date dateString={item.publishedAt} />
                </div>
                <h3 className="text-gray900 group-hover:text-gray-600 mt-2 text-lg font-medium leading-6">
                  <span />
                  {item.title}
                </h3>
                {item?.excerpt && (
                  <div
                    className="mt-2 line-clamp-3 text-sm leading-6 text-gray500"
                    dangerouslySetInnerHTML={{
                      __html: item?.excerpt,
                    }}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex">
          <InternalLink
            href="/nyheter"
            prefetch={false}
            className="font-roboto ml-auto mt-10 rounded-md border border-dark/20 bg-dark px-4 py-2 font-medium text-white transition hover:text-primary"
          >
            Se alla nyheter
          </InternalLink>
        </div>
      </div>
    </div>
  )
}

export default NewsList
