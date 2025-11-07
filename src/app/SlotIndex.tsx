import ModularContent from '@/src/components/content/ModularContent'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import Container from '@/src/components/layout/Container'
import SubPageHero from '@/src/components/content/SubPageHero'
import Heading from '@/src/components/content/Heading'
import SlotCard from '@/src/components/slot/SlotCard'
import SlotPageService from '@/src/services/SlotPageService'
import SubPageService from '@/src/services/SubPageService'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import FAQ from '../components/content/FAQ'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { HeadingObjectSchemaType } from '@/src/schemas/headingObject'
import { slugify } from '@/src/lib/utils'
const slotPageService = new SlotPageService()
const subPageService = new SubPageService()

export default function SlotIndex({
  slotPages,
  page,
}: {
  slotPages: SlotPagePreviewSchemaType[]
  page: SubPageSchemaType
}) {
  const isValidList = slotPageService.validateList(slotPages, true)
  const isValidPage = subPageService.validatePage(page, true)
  const publishedAt = subPageService.getPagePublishedAtTimestamp(page)
  const modifiedAt = subPageService.getPageModifiedAtTimestamp(page)
  const breadcrumbItems = [
    {
      text: 'Slots',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/slots`,
    },
  ]
  const headings = subPageService.getHeadingObjects(page)
  const faqs = page.faqs
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getWebPageStructuredData(page),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
    ],
  }
  const year = new Date().getFullYear()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="slot-index-structured-data"
      />
      <SubPageHero
        page={page}
        createdAt={publishedAt}
        modifiedAt={modifiedAt}
      />
      <BreadCrumbs narrow={false} items={breadcrumbItems} />
      <div className="pb-12 pt-8 lg:pt-10 bg-slate-100">
        <Container>
          <Heading
            level={2}
            sizes={[6, 6, 7]}
            text={`Populära slots ${year}`}
            className="mb-6 text-2xl font-bold text-heading"
          />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {slotPages
              .filter((slotPage: SlotPagePreviewSchemaType) => slotPage.slot)
              .sort(
                (a, b) =>
                  new Date(b.originalPublishedAt ?? b._createdAt).getTime() -
                  new Date(a.originalPublishedAt ?? a._createdAt).getTime()
              )
              .map((slotPage: SlotPagePreviewSchemaType) => (
                <SlotCard key={`slot-${slotPage._id}`} slotPage={slotPage} />
              ))}
          </div>
        </Container>
      </div>
      {faqs && (
        <div className="mb-16 bg-dark py-16">
          <Container>
            <FAQ items={faqs.items} title={faqs.title} />
          </Container>
        </div>
      )}
      {headings.length > 1 && (
        <div className="mb-10">
          <Container narrow>
            <TableOfContents
              headings={headings.map((heading: HeadingObjectSchemaType) => ({
                text: heading.text,
                slug: `${page.slug.current}#${slugify(heading.text)}`,
              }))}
            />
          </Container>
        </div>
      )}
      <ModularContent className="py-5" narrow objects={page.content} />
    </>
  )
}
