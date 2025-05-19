import AuthorBox from "../../../casinogringos-v3/src/components/AuthorBox";
import CasinoList from "../../../casinogringos-v3/src/components/CasinoList";
import Container from "../../../casinogringos-v3/src/components/Container";
import Content from "../../../casinogringos-v3/src/components/Content";
import Hero from "../../../casinogringos-v3/src/components/HomepageHero";
import News from "../../../casinogringos-v3/src/components/News";
import { getBlockHeadings, replaceInternalLinkBaseUrls } from "@/lib/helpers";
import { Guide, Page } from "@/types/index";
import dynamic from "next/dynamic";
const TableOfContents = dynamic(
  () => import("../../../casinogringos-v3/src/components/TableOfContents"),
);
const Faq = dynamic(
  () => import("../../../casinogringos-v3/src/components/Faq"),
);

export default function HomePage({
  homePage,
  guides,
}: {
  homePage: Page;
  guides: { node: Guide }[];
}) {
  const casinos = homePage.pageType.category.edges[0].node.posts.edges ?? [];
  const headings = getBlockHeadings(homePage.editorBlocks);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: replaceInternalLinkBaseUrls(homePage.seo.schema.raw),
        }}
        key="homepage-data"
      />
      <Hero title={homePage.title} description={homePage.pageType.bannerText} />
      <CasinoList
        casinos={casinos}
        key={"casino-list"}
        title={homePage.pageType.subtitle}
      />
      <News posts={guides} />
      {homePage.pageType.faq && (
        <div className="bg-dark pb-6 pt-12 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-0">
            <Faq
              isBlock={false}
              data={{
                attributes: {
                  description: homePage.pageType.faqSubtitle,
                  items: homePage.pageType.faq[0].faqSection.map((item) => ({
                    question: item.faqQuestion,
                    answer: item.faqAnswer,
                  })),
                },
              }}
            />
          </div>
        </div>
      )}
      {headings.length > 0 && (
        <Container>
          <div className="pt-12 lg:pt-16">
            <TableOfContents headings={headings} />
          </div>
        </Container>
      )}
      <Content blocks={homePage.editorBlocks} />
      {homePage.author && (
        <Container>
          <AuthorBox
            author={homePage.author}
            modified={homePage?.modified}
            reviewedBy={homePage?.reviewer}
          />
        </Container>
      )}
    </>
  );
}
