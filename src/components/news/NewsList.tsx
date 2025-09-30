import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import ArticleCard from '@/src/components/article/ArticleCard'

const NewsList = ({
  items,
  itemComponent,
  cardBackground,
}: {
  items: NewsPageSchemaType[]
  itemComponent: typeof ArticleCard
  cardBackground?: boolean
}) => {
  const ItemComponent = itemComponent

  return (
    <div className={`bg-blue-100 py-10 sm:py-20`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Heading
          level={2}
          sizes={[7, 7, 8]}
          text={'Senaste casinonyheter'}
          className="text-gray-900 font-semibold tracking-tight"
        />
        <p className="mt-4 text-slate-600">
          Här hittar du de senaste nyheterna om online casino i Sverige. Vi
          håller oss alltid uppdaterade med vad som sker inom den svenska
          spelbranschen och skriver nyheter kontinuerligt för att hålla dig
          uppdaterad med det senaste inom casinovärlden.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 items-start gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-20">
          {items?.map((item) => <ItemComponent item={item} key={item._id} cardBackground={cardBackground} />)}
        </div>
        <div className="flex">
          <Link
            href="/nyheter"
            prefetch={false}
            className="ml-auto mt-10"
            variant="primary"
          >
            Se alla nyheter
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsList
