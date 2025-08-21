import ModularContent from '@/src/components/organisms/ModularContent'
import HomePageHero from '@/src/components/organisms/HomePageHero'
import CasinoList from '@/src/components/organisms/CasinoList'
import CasinoCard from '@/src/components/organisms/CasinoCard'
import NewsList from '@/src/components/organisms/NewsList'
import Container from '@/src/components/atoms/Container'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getBreadcrumbListStructuredData } from '@/src/structured-data/breadcrumbListStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getPersonStructuredData } from '@/src/structured-data/personStructuredData'
import FAQ from '@/src/components/organisms/FAQ'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import NewsCard from '@/src/components/organisms/NewsCard'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import PageService from '@/src/services/SubPageService'
import ArticleCard from '../components/molecules/ArticleCard'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { BreadcrumbsSchemaType } from '@/src/schemas/breadcrumbs'

const pageService = new PageService()

const HomePage = ({
  page,
  news,
}: {
  page: SubPageSchemaType
  news: NewsPageSchemaType[]
}) => {
  const isValid = pageService.validatePage(page)
  if (!isValid) return null
  const { faqs, author, _updatedAt, reviewer } = page
  const headingObjects = getHeadingObjectsByPage({ objects: page.content })
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getWebSiteStructuredData(), getOrganizationStructuredData()],
  }
  const breadcrumbs = [
    {
      url: '/',
    },
  ]

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
        <Container className='mb-16'>
          <CasinoList
            casinoPages={page.toplist.casinos}
            title={page.toplist.title}
            description={page.toplist.description}
            itemComponent={CasinoCard}
          />
        </Container>
      )}
      <NewsList itemComponent={ArticleCard} items={news} />
      {headingObjects && headingObjects.length > 0 && (
        <Container narrow>
          <div className="pt-12 lg:pt-16">
            <TableOfContents headings={headingObjects} />
          </div>
        </Container>
      )}
      <ModularContent objects={page.content} />
      {author && (
        <Container>
          <AuthorBox
            author={author}
            modified={page._updatedAt ?? page.originalModifiedAt}
            reviewedBy={reviewer}
          />
        </Container>
      )}
      {faqs && (
        <div className='bg-dark pb-16 pt-10'>
          <Container>
            <FAQ items={faqs.items} title={faqs.title} description={faqs.description} />
          </Container>
        </div>
      )}
    </>
  )
}

export default HomePage
