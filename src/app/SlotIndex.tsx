import ModularContent from '@/src/components/organisms/ModularContent'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import Container from '@/src/components/atoms/Container'
import SubPageHero from '@/src/components/molecules/SubPageHero'
import Heading from '@/src/components/atoms/Heading'
import SlotCard from '@/src/components/molecules/SlotCard'
import SlotPageService from '@/src/services/SlotPageService'
import SubPageService from '@/src/services/SubPageService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import { SlotPagePreviewSchemaType, SubPageSchemaType } from '@/src/schemas'
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
      text: 'Hem',
      url: `${process.env.SITE_URL}/`,
    },
    {
      text: 'Slots',
    },
  ]
  const headings = subPageService.getHeadingObjects(page)

  return (
    <>
      <SubPageHero page={page} />
      <BreadCrumbs items={breadcrumbItems} />
      <div className="pb-12 pt-8 lg:pt-10">
        <Container>
          {/* <Heading
            level={2}
            className="mb-6 text-2xl font-bold text-heading"
            text={`${page.subtitle || 'Populära slots'} ${year}`}
          /> */}
          <div className="mt-4 grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-4">
            {slotPages.map((slot: SlotPagePreviewSchemaType) => (
              <SlotCard key={`slot-${slot._id}`} slot={slot} />
            ))}
          </div>
        </Container>
      </div>
      {headings.length > 1 && (
        <Container>
          <TableOfContents headings={headings} />
        </Container>
      )}
      <ModularContent objects={page.content} />
    </>
  )
}
