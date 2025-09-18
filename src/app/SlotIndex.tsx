import ModularContent from '@/src/components/organisms/ModularContent'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import Container from '@/src/components/atoms/Container'
import SubPageHero from '@/src/components/molecules/SubPageHero'
import Heading from '@/src/components/atoms/Heading'
import SlotCard from '@/src/components/molecules/SlotCard'
import SlotPageService from '@/src/services/SlotPageService'
import SubPageService from '@/src/services/SubPageService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import FAQ from '../components/organisms/FAQ'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
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
  const year = new Date().getFullYear()
  const breadcrumbItems = [
    {
      text: 'Slots',
    },
  ]
  const headings = subPageService.getHeadingObjects(page)
  const faqs = page.faqs
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getWebPageStructuredData({ webPage: page }), getWebSiteStructuredData(), getOrganizationStructuredData()],
  }

  return (
    <>
      <SubPageHero page={page} />
      <BreadCrumbs items={breadcrumbItems} />
      <div className="pb-12 pt-8 lg:pt-10 bg-slate-100">
        <Container>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {slotPages.filter((slotPage: SlotPagePreviewSchemaType) => slotPage.slot).map((slotPage: SlotPagePreviewSchemaType) => (
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
            <TableOfContents headings={headings} />
          </Container>
        </div>
      )}
      <ModularContent className='py-5' narrow objects={page.content} />
    </>
  )
}
