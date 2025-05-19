import Content from "../../../casinogringos-v3/src/components/Content";
import Hero from "../../../casinogringos-v3/src/components/Hero";
import Container from "../../../casinogringos-v3/src/components/Container";
import SlotComponent from "../../../casinogringos-v3/src/components/SlotComponent";
import BreadCrumbs from "../../../casinogringos-v3/src/components/BreadCrumbs";
import { getBlockHeadings } from "@/lib/helpers";

import Accordion from "../../../casinogringos-v3/src/components/Accordian";
import TableOfContents from "../../../casinogringos-v3/src/components/TableOfContents";

export default function Slots({ slots, page }) {
  const breadcrumbItems = [
    {
      text: "Slots",
      url: `${process.env.SITE_URL}/slots`,
    },
  ];

  const year = new Date().getFullYear();
  const headings = getBlockHeadings(page?.editorBlocks);

  return (
    <>
      <div className="bg-hero">
        {page && (
          <Hero
            title={page.title}
            description={page.pageType.bannerText}
            date={page.date}
            modified={page.modified}
            author={page.author}
          />
        )}
        <BreadCrumbs items={breadcrumbItems} />
        <div className="pb-12 pt-8 lg:pt-10">
          <Container>
            <h2 className="mb-6 text-2xl font-bold text-heading">
              {page?.pageType?.subtitle || "Populära slots"} {year}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-4">
              {slots.edges.map(({ node }) => (
                <SlotComponent key={`slot-${node.id}`} node={node} />
              ))}
            </div>
          </Container>
        </div>
      </div>
      {page?.pageType.faq && (
        <div className="mb-16 bg-dark px-4 py-16 md:px-0">
          <Container>
            <Accordion
              questionsAnswers={page?.pageType.faq[0].faqSection}
              subtitle={page?.pageType.faqSubtitle}
            />
          </Container>
        </div>
      )}
      {headings.length > 1 && (
        <Container>
          <TableOfContents headings={headings} />
        </Container>
      )}
      {page && (
        <Content
          blocks={page.preview ? page.preview.editorBlocks : page.editorBlocks}
        />
      )}
    </>
  );
}
