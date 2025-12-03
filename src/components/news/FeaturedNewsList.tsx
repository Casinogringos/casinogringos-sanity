import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import ArticleCard from '@/src/components/article/ArticleCard'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'

const NewsList = ({
  items,
  itemComponent,
  cardBackground,
}: {
  items: NewsPagePreviewSchemaType[]
  itemComponent: typeof ArticleCard
  cardBackground?: boolean
}) => {
  const ItemComponent = itemComponent

  return (
    <div className={`pt-8`}>
      <div className="mx-auto">
        <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 items-start gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-y-20">
          {items.map((item) => (
            <ItemComponent
              item={item}
              key={item._id}
              cardBackground={cardBackground}
            />
          ))}
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
