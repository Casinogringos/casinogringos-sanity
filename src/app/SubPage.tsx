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
import PageService from '@/src/services/SubPageService'
import { slugify } from '@/src/lib/utils'
import { getItemListStructuredData } from '@/src/structured-data/itemListStructuredData'
import { getFeaturedImageStructuredData } from '@/src/structured-data/featuredImageStructuredData'
import { HeadingObjectSchemaType } from '@/src/schemas/headingObject'
import { RatingObjectSchemaType } from '../schemas/ratingObject'

const pageService = new PageService()

export default function SubPage({ page }: { page: SubPageSchemaType }) {
  const isValid = pageService.validatePage(page)
  // if (!isValid) {
  //   return null
  // }
  const { toplist, faqs, author, _createdAt, reviewer } = page
  const headingObjects = pageService.getHeadingObjects(page)
  const modifiedAt = pageService.getPageModifiedAtTimestamp(page)
  const createdAt = pageService.getPagePublishedAtTimestamp(page)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getWebPageStructuredData(page),
      getFeaturedImageStructuredData(page),
      getArticleStructuredData(page),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
      getItemListStructuredData(page),
    ],
  }
  const breadcrumbs = [
    {
      text: page.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug.current}`,
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
      <SubPageHero page={page} modifiedAt={modifiedAt} createdAt={createdAt} />
      {breadcrumbs && <BreadCrumbs items={breadcrumbs} />}
      {toplist?.casinos?.length ? (
        <Container width={6} className="mb-16">
          <CasinoList
            itemComponent={CasinoCard}
            casinos={toplist.casinos}
            title={toplist.title}
            description={toplist.description}
            categories={page.bonusCategory ?? []}
          />
        </Container>
      ) : (
        <div className="mb-6" />
      )}
      {/* {faqs && faqs.items.length && (
        <div className="mb-16 bg-dark pb-16 pt-10 mb-16">
          <Container>
            <FAQ items={faqs.items} title={faqs.title} />
          </Container>
        </div>
      )} */}
      {faqs && faqs.items.length && (
        <div className="bg-dark pb-16 pt-10 mb-16">
          <Container width={6}>
            <FAQ items={faqs.items} title={faqs.title} />
          </Container>
        </div>
      )}
      {headingObjects.length > 1 && (
        <div>
          <Container width={3}>
            <TableOfContents
              headings={headingObjects
                .filter(
                  (
                    heading: HeadingObjectSchemaType | RatingObjectSchemaType
                  ) => {
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
                  (
                    heading: HeadingObjectSchemaType | RatingObjectSchemaType
                  ) => {
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
        </div>
      )}
      <ModularContent objects={page.content} className="py-5" width={3} />
      {author && (
        <Container width={3}>
          <AuthorBox
            author={author}
            modified={modifiedAt}
            reviewedBy={reviewer}
          />
        </Container>
      )}
    </div>
  )
}
