import ModularContent from '@/src/components/organisms/ModularContent'
import Container from '@/src/components/atoms/Container'
import ArticleHeader from '@/src/components/molecules/ArticleHeader'
import Heading from '@/src/components/atoms/Heading'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import NewsCard from '@/src/components/organisms/NewsCard'
import getNewsArticleStructuredData from '@/src/structured-data/newsArticleStructuredData'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import Image from 'next/image'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'

export default function NewsPage({
  page,
  similarNews,
}: {
  page: NewsPageSchemaType
  similarNews: NewsPagePreviewSchemaType[]
}) {
  const headingObjects = getHeadingObjectsByPage({ objects: page.content })
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getNewsArticleStructuredData({ page }), getWebPageStructuredData({ webPage: page }), getWebSiteStructuredData(), getOrganizationStructuredData()],
  }
  const breadcrumbs = [
    {
      text: 'Nyheter',
      url: '/nyheter',
    },
    {
      text: page.title,
      url: `/nyheter/${page.slug.current}`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="news-page-structured-data"
      />
      <BreadCrumbs items={breadcrumbs} />
      <Container narrow>
        {page.featuredImage && (
          <div className="mb-4 flex h-auto items-start overflow-hidden rounded-md lg:mb-8 lg:mt-8 lg:h-96 relative">
            <Image
              src={page.featuredImage.src}
              alt={page.featuredImage.alt}
              width={768}
              height={400}
              className={'object-cover h-full w-full'}
            />{' '}
          </div>
        )}
        <ArticleHeader article={page} />
      </Container>
      {headingObjects.length > 2 && (
        <Container narrow>
          <div className="mt-4 px-4 lg:mt-5 lg:px-0">
            <TableOfContents headings={headingObjects} />
          </div>
        </Container>
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
        <section className={'bg-gray-100 py-10'}>
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
