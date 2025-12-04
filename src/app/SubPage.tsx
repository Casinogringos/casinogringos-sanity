import CasinoCard from '@/src/components/casino/CasinoCard'
import CasinoList from '@/src/components/casino/CasinoList'
import AuthorBox from '@/src/components/content/AuthorBox'
import FAQ from '@/src/components/content/FAQ'
import ModularContent from '@/src/components/content/ModularContent'
import SubPageHero from '@/src/components/content/SubPageHero'
import Container from '@/src/components/layout/Container'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import { slugify } from '@/src/lib/utils'
import { HeadingObjectSchemaType } from '@/src/schemas/headingObject'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import PageService from '@/src/services/SubPageService'
import getArticleStructuredData from '@/src/structured-data/articleStructuredData'
import { getFeaturedImageStructuredData } from '@/src/structured-data/featuredImageStructuredData'
import { getItemListStructuredData } from '@/src/structured-data/itemListStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import CampaignCard from '../components/article/CampaignCard'
import { RatingObjectSchemaType } from '../schemas/ratingObject'

const pageService = new PageService()

export default function SubPage({
  page,
  parentPage,
}: {
  page: SubPageSchemaType
  parentPage?: SubPageSchemaType
}) {
  // const isValid = pageService.validatePage(page)
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
    ...(parentPage
      ? [
          {
            text: parentPage.title,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}${parentPage.slug.current}`,
          },
        ]
      : []),
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
      {page.featuredNews?.length ? (
        <div className="bg-slate-100">
          <Container
            width={6}
            className="overflow-x-auto grid md:grid-cols-4 gap-3 py-6"
          >
            {page.featuredNews.map((item) => (
              <CampaignCard key={`campaign-item-${item._id}`} item={item} />
            ))}
          </Container>
        </div>
      ) : null}
      {toplist?.casinos?.length ? (
        <div className="bg-slate-100 pb-16">
          <Container width={6}>
            <CasinoList
              itemComponent={CasinoCard}
              pathname={page.slug.current}
              casinos={toplist.casinos}
              title={page.toplistTitle}
              description={toplist.description}
              categories={page.bonusCategory ?? []}
            />
          </Container>
        </div>
      ) : (
        <div className="mb-6" />
      )}
      {faqs && faqs.items.length ? (
        <div className="bg-dark pb-16 pt-10 mb-8 lg:mb-12">
          <Container width={6}>
            <FAQ items={faqs.items} title={faqs.title} />
          </Container>
        </div>
      ) : (
        <div className="mb-8" />
      )}
      {headingObjects.length > 1 && (
        <Container width={3} className="lg:px-0">
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
      <ModularContent objects={page.content} className="pt-4 pb-5" width={3} />
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
