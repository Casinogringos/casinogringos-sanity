// import AuthorBox from '@/src/components/organisms/AuthorBox'
// import CasinoList from '@/src/components/organisms/CasinoList'
// import Container from '@/src/components/atoms/Container'
import ModularContent from '@/src/components/organisms/ModularContent'
// import {
//   getBlockHeadings,
//   replaceInternalLinkBaseUrls,
// } from '@/src/lib/helpers'
import { SubPage } from '@/src/types'
import HomePageHero from '@/src/components/organisms/HomePageHero'
import CasinoList from '@/src/components/organisms/CasinoList'
import CasinoCard from '@/src/components/organisms/CasinoCard'
// import dynamic from 'next/dynamic'
// const TableOfContents = dynamic(
//   () => import('@/src/components/organisms/TableOfContents')
// )
// const Faq = dynamic(() => import('@/src/components/organisms/Accordian'))

const HomePage = ({ page }: { page: SubPage }) => {
  return (
    <>
      {/*<script*/}
      {/*  type="application/ld+json"*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: replaceInternalLinkBaseUrls(page.seo.schema.raw),*/}
      {/*  }}*/}
      {/*  key="homepage-data"*/}
      {/*/>*/}
      <HomePageHero page={page} />
      <CasinoList
        casinos={page.toplist.casinos}
        title={page.toplist.title}
        description={page.toplist.description}
        itemComponent={CasinoCard}
      />
      {/*<News posts={guides} />*/}
      {/*{page.pageType.faq && (*/}
      {/*  <div className="bg-dark pb-6 pt-12 lg:py-20">*/}
      {/*    <div className="mx-auto max-w-4xl px-4 lg:px-0">*/}
      {/*      <Faq*/}
      {/*        isBlock={false}*/}
      {/*        data={{*/}
      {/*          attributes: {*/}
      {/*            description: page.pageType.faqSubtitle,*/}
      {/*            items: page.pageType.faq[0].faqSection.map((item) => ({*/}
      {/*              question: item.faqQuestion,*/}
      {/*              answer: item.faqAnswer,*/}
      {/*            })),*/}
      {/*          },*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{headings.length > 0 && (*/}
      {/*  <Container>*/}
      {/*    <div className="pt-12 lg:pt-16">*/}
      {/*      <TableOfContents headings={headings} />*/}
      {/*    </div>*/}
      {/*  </Container>*/}
      {/*)}*/}
      <ModularContent objects={page.content} />
      {/*{page.author && (*/}
      {/*  <Container>*/}
      {/*    <AuthorBox*/}
      {/*      author={page.author}*/}
      {/*      modified={page?.modified}*/}
      {/*      reviewedBy={page?.reviewer}*/}
      {/*    />*/}
      {/*  </Container>*/}
      {/*)}*/}
    </>
  )
}

export default HomePage
