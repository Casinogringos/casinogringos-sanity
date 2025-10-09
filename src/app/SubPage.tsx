import { SubPageSchemaType } from '@/src/schemas/subPage'
import ModularContent from '@/src/components/content/ModularContent'
import SubPageHero from '@/src/components/content/SubPageHero'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import CasinoList from '@/src/components/casino/CasinoList'
import CasinoCard from '@/src/components/casino/CasinoCard'
import Container from '@/src/components/layout/Container'
import FAQ from '@/src/components/content/FAQ'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import AuthorBox from '@/src/components/content/AuthorBox'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import PageService from '@/src/services/SubPageService'
import { slugify } from '@/src/lib/helpers'
import { divide } from 'lodash'

const pageService = new PageService()

export default function SubPage({ page }: { page: SubPageSchemaType }) {
  const isValid = pageService.validatePage(page)
  // if (!isValid) {
  //   return null
  // }
  const { toplist, faqs, author, _createdAt, reviewer } = page
  const headingObjects = pageService.getHeadingObjects(page)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getArticleStructuredData(page),
      getWebPageStructuredData({ webPage: page }),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
    ],
  }
  const breadcrumbs = [
    {
      text: page.title,
    },
  ]

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
        <Container className="mb-16">
          <CasinoList
            itemComponent={CasinoCard}
            casinoPages={toplist.casinos}
            title={toplist.title}
            description={toplist.description}
            category={page.bonusCategory ?? ''}
          />
        </Container>
      ) : <div className='mb-6' />}
      {/* {faqs && faqs.items.length && (
        <div className="mb-16 bg-dark pb-16 pt-10 mb-16">
          <Container>
            <FAQ items={faqs.items} title={faqs.title} />
          </Container>
        </div>
      )} */}
      {headingObjects.length > 1 && (
        <div>
          <Container narrow>
            <TableOfContents
              headings={headingObjects.map(
                (heading: HeadingObjectSchemaType) => ({
                  text: heading.text,
                  slug: `${page.slug.current}#${slugify(heading.text)}`,
                })
              )}
            />
          </Container>
        </div>
      )}
      <ModularContent objects={page.content} className="py-5" narrow />
      {author && (
        <Container narrow>
          <AuthorBox
            author={author}
            modified={page._updatedAt ?? page.originalModifiedAt}
            reviewedBy={reviewer}
          />
        </Container>
      )}
      {!toplist?.casinos?.length && faqs && (
        <div className="bg-dark pb-16 pt-10">
          <Container>
            <FAQ items={faqs.items} title={faqs.title} />
          </Container>
        </div>
      )}
    </div>
  )
}
