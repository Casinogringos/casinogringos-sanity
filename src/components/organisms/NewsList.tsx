import { NewsPage } from '@/src/types'
import Heading from '@/src/components/atoms/Heading'
import NewsCard from '@/src/components/organisms/NewsCard'
import Link from 'next/link'
import { NewsPageSchemaType } from '@/src/schemas'

const NewsList = ({
  items,
  itemComponent,
}: {
  items: NewsPageSchemaType[]
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
          {items?.map((item) => (
            <ItemComponent item={item} key={item._id} />
          ))}
        </div>
        <div className="flex">
          <Link
            href="/nyheter"
            prefetch={false}
            className="font-roboto ml-auto mt-10 rounded-md border border-dark/20 bg-dark px-4 py-2 font-medium text-white transition hover:text-primary"
          >
            Se alla nyheter
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsList
