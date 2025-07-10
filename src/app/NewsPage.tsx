import ModularContent from '@/src/components/organisms/ModularContent'
import Container from '@/src/components/atoms/Container'
import SanityImage from '@/src/components/atoms/SanityImage'
import PostHeader from '@/src/components/molecules/PostHeader'
import Heading from '@/src/components/atoms/Heading'
import { NewsPageSchemaType } from '@/src/schemas'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import NewsCard from '@/src/components/organisms/NewsCard'
import getNewsArticleStructuredData from '@/src/structured-data/newsArticleStructuredData'

export default function NewsPage({
  page,
  similarNews,
}: {
  page: NewsPageSchemaType
  similarNews: NewsPageSchemaType[]
}) {
  const headingObjects = getHeadingObjectsByPage({ objects: page.content })
  const schema = {
    ...getNewsArticleStructuredData(page),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="news-page-structured-data"
      />
      <div className="mx-auto mb-0 max-w-3xl px-4 pt-6 lg:px-0">
        {page.featuredImage && (
          <div className="mb-4 flex h-auto items-start overflow-hidden rounded-md lg:mb-8 lg:mt-8 lg:h-96">
            <SanityImage
              image={page.featuredImage.image}
              altText={page.featuredImage.altText}
              priority={true}
              width={768}
              className="h-full w-full object-cover"
            />{' '}
          </div>
        )}
        <PostHeader post={page} />
      </div>
      {headingObjects.length > 2 && (
        <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">
          <TableOfContents headings={headingObjects} />
        </div>
      )}
      <ModularContent objects={page.content} />
      {page.author && (
        <div className="mx-4 lg:mx-0">
          <AuthorBox
            author={page.author}
            modified={page._updatedAt ?? page.originalModifiedAt}
            reviewedBy={page.reviewer}
          />
        </div>
      )}
      {similarNews && (
        <section className={'bg-gray100 py-10'}>
          <Container>
            <Heading level={3} className={'mb-4 text-2xl text-gray700'}>
              <span>Fler nyheter</span>
            </Heading>
            <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
              {similarNews.map((item) => (
                <NewsCard key={`news-card-${item._id}`} item={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
