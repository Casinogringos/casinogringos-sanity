import { SubPageSchemaType, BreadcrumbsSchemaType } from '@/src/schemas'
import ModularContent from '@/src/components/organisms/ModularContent'
import SubPageHero from '@/src/components/molecules/SubPageHero'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getPersonStructuredData } from '@/src/structured-data/personStructuredData'
import { getBreadcrumbListStructuredData } from '@/src/structured-data/breadcrumbListStructuredData'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import CasinoList from '@/src/components/organisms/CasinoList'
import CasinoCard from '@/src/components/organisms/CasinoCard'
import Container from '@/src/components/atoms/Container'
import FAQ from '@/src/components/organisms/FAQ'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import PageService from '@/src/services/PageService'

const pageService = new PageService()

export default function SubPage({
  page,
  breadcrumbs,
}: {
  page: SubPageSchemaType
  breadcrumbs: BreadcrumbsSchemaType
}) {
  const isValid = pageService.validateSchema(page)
  // if (!isValid) {
  //   return null
  // }
  const { toplist, faqs, author, _createdAt, reviewer } = page
  const headingObjects = getHeadingObjectsByPage({ objects: page.content })
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getArticleStructuredData(page)],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="subpage-data"
      />
      <SubPageHero page={page} />
      {breadcrumbs && <BreadCrumbs items={breadcrumbs} />}
      {toplist?.casinos?.length ? (
        <CasinoList
          itemComponent={CasinoCard}
          casinos={toplist.casinos}
          title={toplist.title}
          description={toplist.description}
        />
      ) : null}
      {faqs?.length > 0 && (
        <div className="mb-16 bg-dark px-4 py-16 md:px-0">
          <Container>
            <FAQ items={faqs} title={faqs.title} />
          </Container>
        </div>
      )}
      {headingObjects.length > 1 && (
        <div className={faqs?.length > 0 ? '' : 'mt-16'}>
          <Container narrow>
            <TableOfContents headings={headingObjects} />
          </Container>
        </div>
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
    </div>
  )
}
