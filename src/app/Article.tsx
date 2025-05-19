import Image from "next/image";
import Link from "next/link";
import { getBlockHeadings, replaceInternalLinkBaseUrls } from "../lib/helpers";

import Content from "../../../casinogringos-v3/src/components/Content";
import AuthorBox from "../../../casinogringos-v3/src/components/AuthorBox";
import Container from "../../../casinogringos-v3/src/components/Container";
import ImageComponent from "../../../casinogringos-v3/src/components/ImageComponent";
import PostHeader from "../../../casinogringos-v3/src/components/PostHeader";
import TableOfContents from "../../../casinogringos-v3/src/components/TableOfContents";

export default function Article({ article, similarArticles }) {
  const headings = getBlockHeadings(article?.editorBlocks);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: replaceInternalLinkBaseUrls(article?.seo?.schema?.raw),
        }}
        key="homepage-data"
      />
      <div className="mx-auto mb-0 max-w-3xl px-4 pt-6 lg:px-0">
        {article?.featuredImage && (
          <div className="mb-4 flex h-auto items-start overflow-hidden rounded-md lg:mb-8 lg:mt-8 lg:h-96">
            <ImageComponent
              image={article?.featuredImage?.node}
              priority={true}
              width={768}
              className="h-full w-full object-cover"
            />{" "}
          </div>
        )}
        <PostHeader
          title={article.title}
          author={article.author}
          modified={article.modified}
          shareTitle={article?.seo?.title}
          reviewedBy={article?.reviewer}
        />
      </div>
      {headings.length > 2 && (
        <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">
          <TableOfContents headings={headings} />
        </div>
      )}
      <Content
        blocks={
          article.preview ? article.preview.editorBlocks : article.editorBlocks
        }
      />
      {article?.author && (
        <div className="mx-4 lg:mx-0">
          <AuthorBox
            author={article?.author}
            modified={article?.modified}
            reviewedBy={article?.reviewer}
          />
        </div>
      )}
      {similarArticles && (
        <section className={"bg-gray100 py-10"}>
          <Container>
            <h3 className={"mb-4 text-2xl text-gray700"}>
              Fler
              {article?.__typename === "Guide" ? " guider" : " nyheter"}
            </h3>
            <div className={"grid grid-cols-2 gap-4 lg:grid-cols-4"}>
              {similarArticles.map(({ node }) => (
                <Link
                  href={`/${article?.__typename === "Guide" ? "guider" : "nyheter"}/${node.slug}`}
                  key={`article-${node.id}`}
                  className={"flex flex-col"}
                >
                  {node?.featuredImage && (
                    <div
                      className={
                        "flex rounded-md overflow-hidden mb-3 relative"
                      }
                    >
                      <Image
                        src={node.featuredImage.node.sourceUrl}
                        alt={node.featuredImage.node.altText}
                        width={500}
                        height={300}
                        className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"
                      />
                    </div>
                  )}
                  <h4 className={"text-gray700"}>{node.title}</h4>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
