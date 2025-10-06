import ModularContent from '@/src/components/content/ModularContent'
import HomePageHero from '@/src/components/content/HomePageHero'
import CasinoList from '@/src/components/casino/CasinoList'
import CasinoCard from '@/src/components/casino/CasinoCard'
import NewsList from '@/src/components/news/NewsList'
import Container from '@/src/components/layout/Container'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getBreadcrumbListStructuredData } from '@/src/structured-data/breadcrumbListStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getPersonStructuredData } from '@/src/structured-data/personStructuredData'
import FAQ from '@/src/components/content/FAQ'
import AuthorBox from '@/src/components/content/AuthorBox'
import NewsCard from '@/src/components/news/NewsCard'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import PageService from '@/src/services/SubPageService'
import ArticleCard from '../components/article/ArticleCard'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { BreadcrumbsSchemaType } from '@/src/schemas/breadcrumbs'
import { slugify } from '@/src/lib/helpers'
import { HeadingObjectSchemaType } from '../schemas/headingObject'

const pageService = new PageService()

const HomePage = ({
  page,
  news,
  toplistCategory,
}: {
  page: SubPageSchemaType
  news: NewsPageSchemaType[]
  toplistCategory: string
}) => {
  const isValid = pageService.validatePage(page)
  if (!isValid) return null
  const { faqs, author, _updatedAt, reviewer } = page
  const headingObjects = getHeadingObjectsByPage({ objects: page.content })
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getWebSiteStructuredData(),
      getWebPageStructuredData(page),
      getOrganizationStructuredData(),
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
          <Container className="pb-16">
            <CasinoList
              casinoPages={page.toplist.casinos}
              title={page.toplist.title}
              description={page.toplist.description}
              itemComponent={CasinoCard}
              category={toplistCategory}
            />
          </Container>
        </div>
      )}
      <NewsList itemComponent={ArticleCard} items={news} cardBackground />
      {headingObjects && headingObjects.length > 0 && (
        <Container narrow>
          <div className="pt-12 lg:pt-16">
            <TableOfContents
              headings={headingObjects.map(
                (heading: HeadingObjectSchemaType) => ({
                  text: heading.text,
                  slug: `${page.slug.current}#${slugify(heading.text)}`,
                })
              )}
            />
          </div>
        </Container>
      )}
      <ModularContent className="py-10" narrow objects={page.content} />
      {author && (
        <Container narrow>
          <AuthorBox
            author={author}
            modified={pageService.getPageModifiedAtTimestamp(page)}
            reviewedBy={reviewer}
          />
        </Container>
      )}
      {faqs && (
        <div className="bg-dark pb-16 pt-16">
          <Container>
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
