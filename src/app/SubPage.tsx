import {
  getBlockHeadings,
  replaceInternalLinkBaseUrls,
} from '@/src/lib/helpers'
import { Page as PageType } from '@/src/types'
import dynamic from 'next/dynamic'
import AuthorBox from '@/src/app/components/organisms/AuthorBox'
import BreadCrumbs from '@/src/app/components/organisms/BreadCrumbs'
import CasinoList from '@/src/app/components/organisms/CasinoList'
import Container from '@/src/app/components/atoms/Container'
import ModularContent from '@/src/app/components/organisms/ModularContent'
import Hero from '@/src/app/components/molecules/Hero'
const TableOfContents = dynamic(
  () => import('@/src/app/components/organisms/TableOfContents')
)
const Accordion = dynamic(
  () => import('@/src/app/components/organisms/Accordion')
)

export default function SubPage({ page }: { page: PageType }) {
  // const casinos = page.pageType.category?.edges[0].node.posts.edges ?? []
  // const headings = getBlockHeadings(page?.editorBlocks)

  return (
    <div>
      {/*<script*/}
      {/*  type="application/ld+json"*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: replaceInternalLinkBaseUrls(page?.seo?.schema?.raw),*/}
      {/*  }}*/}
      {/*  key="homepage-data"*/}
      {/*/>*/}
      {/*<Hero*/}
      {/*  title={page?.title}*/}
      {/*  shareTitle={page?.seo?.title}*/}
      {/*  author={page?.author}*/}
      {/*  date={page?.date}*/}
      {/*  modified={page?.modified}*/}
      {/*  description={page?.pageType?.bannerText}*/}
      {/*/>*/}
      {/*{page?.seo?.breadcrumbs && <BreadCrumbs items={page.seo?.breadcrumbs} />}*/}
      {/*{casinos.length ? (*/}
      {/*  <CasinoList casinos={casinos} title={page?.pageType?.subtitle} />*/}
      {/*) : null}*/}
      {/*{page?.pageType.faq && (*/}
      {/*  <div className="mb-16 bg-dark px-4 py-16 md:px-0">*/}
      {/*    <Container>*/}
      {/*      <Accordion*/}
      {/*        items={page?.pageType.faq[0].faqSection}*/}
      {/*        subtitle={page?.pageType?.faqSubtitle}*/}
      {/*      />*/}
      {/*    </Container>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{headings.length > 1 && (*/}
      {/*  <div className={page?.pageType?.faq ? '' : 'mt-16'}>*/}
      {/*    <Container>*/}
      {/*      <TableOfContents headings={headings} />*/}
      {/*    </Container>*/}
      {/*  </div>*/}
      {/*)}*/}
      <ModularContent objects={page.content} />
      {/*{page?.author && (*/}
      {/*  <Container>*/}
      {/*    <AuthorBox*/}
      {/*      author={page?.author}*/}
      {/*      modified={page?.modified}*/}
      {/*      reviewedBy={page?.reviewer}*/}
      {/*    />*/}
      {/*  </Container>*/}
      {/*)}*/}
    </div>
  )
}
