import ArticleHeader from '@/src/components/article/ArticleHeader'
import AuthorBox from '@/src/components/content/AuthorBox'
import Heading from '@/src/components/content/Heading'
import ModularContent from '@/src/components/content/ModularContent'
import Container from '@/src/components/layout/Container'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import { getHeadingObjectsByPage, slugify } from '@/src/lib/utils'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { RatingObjectSchemaType } from '@/src/schemas/ratingObject'
import NewsPageService from '@/src/services/NewsPageService'
import { getFeaturedImageStructuredData } from '@/src/structured-data/featuredImageStructuredData'
import getNewsArticleStructuredData from '@/src/structured-data/newsArticleStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import Image from 'next/image'
import ArticleCard from '../components/article/ArticleCard'
import { HeadingObjectSchemaType } from '../schemas/headingObject'

const newsPageService = new NewsPageService()

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
    '@graph': [
      getNewsArticleStructuredData(page),
      getWebPageStructuredData(page),
      getFeaturedImageStructuredData(page),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
    ],
  }
  const breadcrumbs = [
    {
      text: 'Nyheter',
      url: '/nyheter',
    },
    {
      text: page.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
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
      <BreadCrumbs items={breadcrumbs} narrow />
      <Container width={3} className="lg:px-0">
        {page.featuredImage && (
          <div className="mb-4 flex h-auto overflow-hidden rounded-md lg:mb-8 lg:mt-8 lg:h-[400px] relative">
            <Image
              src={page.featuredImage.src}
              alt={page.featuredImage.alt}
              width={768}
              height={400}
              className={'object-cover object-top h-full w-full'}
            />{' '}
          </div>
        )}
        <ArticleHeader article={page} />
      </Container>
      {headingObjects.length > 2 && (
        <Container width={3} className="mt-4 px-4 lg:mt-5 lg:px-0">
          <TableOfContents
            headings={headingObjects
              .filter(
                (heading: HeadingObjectSchemaType | RatingObjectSchemaType) => {
                  if (heading._type === 'heading-object') {
                    return heading.text
                  }
                  if (heading._type === 'rating-object') {
                    return heading.title
                  }
                  return false
                }
              )
              .map(
                (heading: HeadingObjectSchemaType | RatingObjectSchemaType) => {
                  switch (heading._type) {
                    case 'heading-object': {
                      return {
                        text: heading.text,
                        slug: `${page.slug.current}#${slugify(heading.text)}`,
                      }
                    }
                    case 'rating-object': {
                      return {
                        text: heading.title,
                        slug: `${page.slug.current}#${slugify(heading.title)}`,
                      }
                    }
                  }
                }
              )}
          />
        </Container>
      )}
      <ModularContent width={3} objects={page.content} className={'py-5'} />
      {page.author && (
        <Container width={3}>
          <AuthorBox
            author={page.author}
            modified={newsPageService.getPageModifiedAtTimestamp(page)}
            reviewedBy={page?.reviewer}
          />
        </Container>
      )}
      {similarNews && (
        <section className={'bg-gray-100 py-10'}>
          <Container width={6}>
            <Heading
              level={3}
              sizes={[6, 6, 6]}
              className={'mb-6'}
              text="Fler Nyheter"
            />
            <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
              {similarNews.map((item) => (
                <ArticleCard key={`news-card-${item._id}`} item={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
