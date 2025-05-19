import { getBlockHeadings, replaceInternalLinkBaseUrls } from "@/lib/helpers";
import { Page as PageType } from "@/types/index";
import dynamic from "next/dynamic";

import AuthorBox from "../../../casinogringos-v3/src/components/AuthorBox";
import BreadCrumbs from "../../../casinogringos-v3/src/components/BreadCrumbs";
import CasinoList from "../../../casinogringos-v3/src/components/CasinoList";
import Container from "../../../casinogringos-v3/src/components/Container";
import Content from "../../../casinogringos-v3/src/components/Content";
import Hero from "../../../casinogringos-v3/src/components/Hero";

const TableOfContents = dynamic(
  () => import("../../../casinogringos-v3/src/components/TableOfContents"),
);
const Accordion = dynamic(
  () => import("../../../casinogringos-v3/src/components/Accordian"),
);

export default function SubPage({ page }: { page: PageType }) {
  const casinos = page.pageType.category?.edges[0].node.posts.edges ?? [];
  const headings = getBlockHeadings(page?.editorBlocks);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: replaceInternalLinkBaseUrls(page?.seo?.schema?.raw),
        }}
        key="homepage-data"
      />
      <Hero
        title={page?.title}
        shareTitle={page?.seo?.title}
        author={page?.author}
        date={page?.date}
        modified={page?.modified}
        description={page?.pageType?.bannerText}
      />
      {page?.seo?.breadcrumbs && <BreadCrumbs items={page.seo?.breadcrumbs} />}
      {casinos.length ? (
        <CasinoList casinos={casinos} title={page?.pageType?.subtitle} />
      ) : null}
      {page?.pageType.faq && (
        <div className="mb-16 bg-dark px-4 py-16 md:px-0">
          <Container>
            <Accordion
              questionsAnswers={page?.pageType.faq[0].faqSection}
              subtitle={page?.pageType?.faqSubtitle}
            />
          </Container>
        </div>
      )}
      {headings.length > 1 && (
        <div className={page?.pageType?.faq ? "" : "mt-16"}>
          <Container>
            <TableOfContents headings={headings} />
          </Container>
        </div>
      )}
      <Content
        blocks={page.preview ? page.preview.editorBlocks : page.editorBlocks}
      />
      {page?.author && (
        <Container>
          <AuthorBox
            author={page?.author}
            modified={page?.modified}
            reviewedBy={page?.reviewer}
          />
        </Container>
      )}
    </div>
  );
}
