import { SlotPage, SubPage, TOCItem, Object } from '@/src/types'
import ModularContent from '@/src/components/organisms/ModularContent'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import Container from '@/src/components/atoms/Container'
import SubPageHero from '@/src/components/molecules/SubPageHero'
import Heading from '@/src/components/atoms/Heading'
import SlotCard from '@/src/components/molecules/SlotCard'

export default function SlotIndex({
  slots,
  page,
}: {
  slots: SlotPage<false>[]
  page: SubPage<true>
}) {
  const year = new Date().getFullYear()
  const headings = page?.content.reduce((acc: TOCItem[], curr: Object) => {
    if (curr._type === 'heading-object') {
      acc.push({ text: curr.text })
    }
    return acc
  }, [])

  return (
    <>
      <div>
        <SubPageHero page={page} />
        {/*  <BreadCrumbs items={breadcrumbItems} />*/}
        <div className="pb-12 pt-8 lg:pt-10">
          <Container>
            {/*<Heading*/}
            {/*  level={2}*/}
            {/*  className="mb-6 text-2xl font-bold text-heading"*/}
            {/*  text={`${page?.pageType?.subtitle || 'Populära slots'} {year}}`}*/}
            {/*/>*/}
            <div className="mt-4 grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-4">
              {slots.map((slot: SlotPage<false>) => (
                <SlotCard key={`slot-${slot._key}`} slot={slot} />
              ))}
            </div>
          </Container>
        </div>
        {/*</div>*/}
        {/*{page?.pageType.faq && (*/}
        {/*  <div className="mb-16 bg-dark px-4 py-16 md:px-0">*/}
        {/*    <Container>*/}
        {/*      <Accordion*/}
        {/*        questionsAnswers={page?.pageType.faq[0].faqSection}*/}
        {/*        subtitle={page?.pageType.faqSubtitle}*/}
        {/*      />*/}
        {/*    </Container>*/}
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
