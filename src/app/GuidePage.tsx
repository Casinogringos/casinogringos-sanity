import ModularContent from '@/src/components/organisms/ModularContent'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { getBlogPostingStructuredData } from '@/src/structured-data/blogPostingStructuredData'

export default function GuidePage({ page }: { page: GuidePageSchemaType }) {
  // const headings = getBlockHeadings(page?.editorBlocks);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getBlogPostingStructuredData({ page }),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="guide-page-structured-data"
      />
      {/*<div className="mx-auto mb-0 max-w-3xl px-4 pt-6 lg:px-0">*/}
      {/*{page?.featuredImage && (*/}
      {/*  <div className="mb-4 flex h-auto items-start overflow-hidden rounded-md lg:mb-8 lg:mt-8 lg:h-96">*/}
      {/*    <ImageComponent*/}
      {/*      image={page?.featuredImage?.node}*/}
      {/*      priority={true}*/}
      {/*      width={768}*/}
      {/*      className="h-full w-full object-cover"*/}
      {/*    />{" "}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*<PostHeader*/}
      {/*  title={page.title}*/}
      {/*  author={page.author}*/}
      {/*  modified={page.modified}*/}
      {/*  shareTitle={page?.seo?.title}*/}
      {/*  reviewedBy={page?.reviewer}*/}
      {/*/>*/}
      {/*</div>*/}
      {/*{headings.length > 2 && (*/}
      {/*  <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">*/}
      {/*    <TableOfContents headings={headings} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <ModularContent objects={page.content} />
      {/*{page?.author && (*/}
      {/*  <div className="mx-4 lg:mx-0">*/}
      {/*    <AuthorBox*/}
      {/*      author={page?.author}*/}
      {/*      modified={page?.modified}*/}
      {/*      reviewedBy={page?.reviewer}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{similarArticles && (*/}
      {/*  <section className={"bg-gray100 py-10"}>*/}
      {/*    <Container>*/}
      {/*      <h3 className={"mb-4 text-2xl text-gray700"}>*/}
      {/*        Fler*/}
      {/*        {page?.__typename === "Guide" ? " guider" : " nyheter"}*/}
      {/*      </h3>*/}
      {/*      <div className={"grid grid-cols-2 gap-4 lg:grid-cols-4"}>*/}
      {/*        {similarArticles.map(({ node }) => (*/}
      {/*          <Link*/}
      {/*            href={`/${page?.__typename === "Guide" ? "guider" : "nyheter"}/${node.slug}`}*/}
      {/*            key={`article-${node.id}`}*/}
      {/*            className={"flex flex-col"}*/}
      {/*          >*/}
      {/*            {node?.featuredImage && (*/}
      {/*              <div*/}
      {/*                className={*/}
      {/*                  "flex rounded-md overflow-hidden mb-3 relative"*/}
      {/*                }*/}
      {/*              >*/}
      {/*                <Image*/}
      {/*                  src={node.featuredImage.node.sourceUrl}*/}
      {/*                  alt={node.featuredImage.node.altText}*/}
      {/*                  width={500}*/}
      {/*                  height={300}*/}
      {/*                  className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"*/}
      {/*                />*/}
      {/*              </div>*/}
      {/*            )}*/}
      {/*            <h4 className={"text-gray700"}>{node.title}</h4>*/}
      {/*          </Link>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </Container>*/}
      {/*  </section>*/}
      {/*)}*/}
    </>
  )
}
