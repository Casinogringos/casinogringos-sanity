import { SubPage as SubPageType } from '@/src/types'
import ModularContent from '@/src/components/organisms/ModularContent'
import SubPageHero from '@/src/components/molecules/SubPageHero'

export default function SubPage({ page }: { page: SubPageType<true> }) {
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
      <SubPageHero page={page} />
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
