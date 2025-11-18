import CasinoCard from '@/src/components/casino/CasinoCard'
import CasinoList from '@/src/components/casino/CasinoList'
import AuthorBox from '@/src/components/content/AuthorBox'
import FAQ from '@/src/components/content/FAQ'
import HomePageHero from '@/src/components/content/HomePageHero'
import ModularContent from '@/src/components/content/ModularContent'
import Container from '@/src/components/layout/Container'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import NewsList from '@/src/components/news/NewsList'
import { getHeadingObjectsByPage, slugify } from '@/src/lib/utils'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { RatingObjectSchemaType } from '@/src/schemas/ratingObject'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import PageService from '@/src/services/SubPageService'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import ArticleCard from '../components/article/ArticleCard'
import { HeadingObjectSchemaType } from '../schemas/headingObject'
import { getItemListStructuredData } from '../structured-data/itemListStructuredData'

const pageService = new PageService()

const HomePage = ({
  page,
  news,
  toplistCategories,
}: {
  page: SubPageSchemaType
  news: NewsPagePreviewSchemaType[]
  toplistCategories: { value: string }[]
}) => {
  const isValid = pageService.validatePage(page)
  if (!isValid) return null
  const { faqs, author, _updatedAt, reviewer } = page
  const headingObjects: Array<
    HeadingObjectSchemaType | RatingObjectSchemaType
  > = getHeadingObjectsByPage({ objects: page.content })
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getWebSiteStructuredData(),
      getWebPageStructuredData(page),
      getOrganizationStructuredData(),
      getItemListStructuredData(page),
      getArticleStructuredData(page),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="homepage-structured-data"
      />
      <HomePageHero page={page} />
      {page.toplist?.casinos && page.toplist.casinos.length > 0 && (
        <div className="bg-slate-100">
          <Container width={6} className="pb-16">
            <CasinoList
              casinos={page.toplist.casinos}
              title={page.toplistTitle ?? ''}
              description={page.toplist.description}
              itemComponent={CasinoCard}
              categories={toplistCategories}
            />
          </Container>
        </div>
      )}
      <NewsList itemComponent={ArticleCard} items={news} cardBackground />
      {headingObjects && headingObjects.length > 0 && (
        <Container width={3} className="lg:!px-0 pt-6 md:pt-10">
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
      <ModularContent
        className="py-4 pb-10"
        width={3}
        objects={page.content}
        bonusCategories={toplistCategories}
      />
      {author && (
        <Container width={3}>
          <AuthorBox
            author={author}
            modified={pageService.getPageModifiedAtTimestamp(page)}
            reviewedBy={reviewer}
          />
        </Container>
      )}
      {faqs && (
        <div className="bg-dark pb-16 pt-16">
          <Container width={4}>
            <FAQ
              items={faqs.items}
              title={faqs.title}
              description={faqs.description}
            />
          </Container>
        </div>
      )}
    </>
  )
}

export default HomePage
