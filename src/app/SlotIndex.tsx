import ModularContent from '@/src/app/components/organisms/ModularContent'
import Hero from '@/src/app/components/molecules/Hero'
import Container from '@/src/app/components/atoms/Container'
import SlotCard from '@/src/app/components/molecules/SlotCard'
import BreadCrumbs from '@/src/app/components/organisms/BreadCrumbs'
import { getBlockHeadings } from '@/src/lib/helpers'
import Accordion from '@/src/app/components/organisms/Accordion'
import TableOfContents from '@/src/app/components/organisms/TableOfContents'

export default function SlotIndex({
  slots,
  page,
}: {
  slots?: Slot[]
  page?: PageType
}) {
  const breadcrumbItems = [
    {
      text: 'Slots',
      url: `${process.env.SITE_URL}/slots`,
    },
  ]

  const year = new Date().getFullYear()
  const headings = getBlockHeadings(page?.editorBlocks)
  console.log('page!', page)

  return (
    <>
      {/*<div className="bg-hero">*/}
      {/*  {page && (*/}
      {/*    <Hero*/}
      {/*      title={page.title}*/}
      {/*      description={page.pageType.bannerText}*/}
      {/*      date={page.date}*/}
      {/*      modified={page.modified}*/}
      {/*      author={page.author}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  <BreadCrumbs items={breadcrumbItems} />*/}
      {/*  <div className="pb-12 pt-8 lg:pt-10">*/}
      {/*    <Container>*/}
      {/*      <h2 className="mb-6 text-2xl font-bold text-heading">*/}
      {/*        {page?.pageType?.subtitle || 'Populära slots'} {year}*/}
      {/*      </h2>*/}
      {/*      <div className="mt-4 grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-4">*/}
      {/*        {slots.edges.map(({ node }) => (*/}
      {/*          <SlotCard key={`slot-${node.id}`} node={node} />*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </Container>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*{page?.pageType.faq && (*/}
      {/*  <div className="mb-16 bg-dark px-4 py-16 md:px-0">*/}
      {/*    <Container>*/}
      {/*      <Accordion*/}
      {/*        questionsAnswers={page?.pageType.faq[0].faqSection}*/}
      {/*        subtitle={page?.pageType.faqSubtitle}*/}
      {/*      />*/}
      {/*    </Container>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{headings.length > 1 && (*/}
      {/*  <Container>*/}
      {/*    <TableOfContents headings={headings} />*/}
      {/*  </Container>*/}
      {/*)}*/}
      {page && <ModularContent objects={page.content} />}
    </>
  )
}
