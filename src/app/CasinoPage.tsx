import ModularContent from '@/src/components/organisms/ModularContent'
import { CasinoPage as CasinoPageType } from '@/src/types'

export default function CasinoPage({ page }: { page: CasinoPageType }) {
  // const author = page?.author.node
  // const siteURL = process.env.SITE_URL
  // const headings = getBlockHeadings(page?.editorBlocks)
  // const casinoService = new CasinoService()
  // const { finalRating } = casinoService.getCasinoRating({ page: page })

  // const structuredData = {
  //   '@context': 'https://schema.org/',
  //   '@type': 'Review',
  //   itemReviewed: {
  //     '@type': 'Organization',
  //     image: page?.featuredImage
  //       ? page?.featuredImage.node.sourceUrl
  //       : null,
  //     name: page?.title,
  //   },
  //   reviewRating: {
  //     '@type': 'Rating',
  //     ratingValue: finalRating,
  //     bestRating: '5',
  //     worstRating: '1',
  //   },
  //   author: {
  //     '@type': 'Person',
  //     name: author?.name,
  //     url: siteURL + author.uri,
  //     email: author?.userType?.email,
  //     jobTitle: author?.userType?.role ? author.userType.role : 'Skribent',
  //     sameAs: author?.seo?.social?.linkedIn,
  //     image: {
  //       '@type': 'ImageObject',
  //       inLanguage: 'sv-SE',
  //       id: 'https://casinogringos.se/#/schema/person/image/',
  //       url: author?.avatar?.url,
  //       caption: author?.avatar?.altText,
  //     },
  //   },
  //   publisher: {
  //     '@type': 'Organization',
  //     name: 'Casinogringos',
  //     url: siteURL,
  //     sameAs: [
  //       'https://www.facebook.com/Casinogringos',
  //       'https://www.instagram.com/casinogringos/',
  //       'https://www.youtube.com/channel/UCeFbFMkDfTlLayuZmk_aXiA',
  //       'https://www.twitch.tv/casinogringos',
  //       'https://twitter.com/CasinoGringos',
  //     ],
  //   },
  //   isPartOf: [
  //     {
  //       id: `${siteURL}/#website`,
  //       '@type': 'WebSite',
  //       name: 'Casinogringos.se',
  //       url: siteURL,
  //       inLanguage: 'sv-se',
  //     },
  //   ],
  // }

  return (
    <>
      {/*<script*/}
      {/*  type="application/ld+json"*/}
      {/*  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}*/}
      {/*  key="homepage-data"*/}
      {/*/>*/}
      <article>
        {/*<CasinoHero*/}
        {/*  title={page?.title}*/}
        {/*  introduction={page?.postType?.introduction}*/}
        {/*  coverImage={page?.featuredImage}*/}
        {/*  bonus={page?.postType?.title}*/}
        {/*  backgroundColor={page?.postType?.brandColor}*/}
        {/*  rating={finalRating}*/}
        {/*  affiliateLink={page?.postType?.affiliateLink?.node.slug}*/}
        {/*  disclaimer={page?.postType?.disclaimer}*/}
        {/*/>*/}
        {/*{page?.seo?.breadcrumbs && (*/}
        {/*  <BreadCrumbs items={page.seo?.breadcrumbs} />*/}
        {/*)}*/}
        {/*<div className="border-b border-b-slate100 bg-slate50 px-4 pb-4 pt-8 md:pb-6 lg:px-0">*/}
        {/*  <Container className="!px-0">*/}
        {/*    <PostInfo casino={page} title={page?.title} />*/}
        {/*  </Container>*/}
        {/*</div>*/}
        {/*<div className="mx-auto max-w-3xl pb-6">*/}
        {/*  <div className="mb-4 mt-10 px-4 lg:px-0">*/}
        {/*    <Avatar*/}
        {/*      author={page?.author}*/}
        {/*      reviewedBy={page?.reviewer}*/}
        {/*      modified={page?.modified}*/}
        {/*      shareTitle={page?.seo?.title}*/}
        {/*      date={page?.date}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  {headings.length > 0 && (*/}
        {/*    <div className={'-mb-8 px-4 lg:px-0'}>*/}
        {/*      <TableOfContents headings={headings} />*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
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
        {/*{similarCasinos && (*/}
        {/*  <section className={'bg-gray100 py-10'}>*/}
        {/*    <Container>*/}
        {/*      <h3 className={'mb-4 text-2xl text-gray700'}>*/}
        {/*        Fler populära casinon*/}
        {/*      </h3>*/}
        {/*      <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>*/}
        {/*        {similarCasinos.map(({ node }) => (*/}
        {/*          <Link*/}
        {/*            href={`/${node.slug}`}*/}
        {/*            key={`similar-post-${node.id}`}*/}
        {/*            className={'flex flex-col'}*/}
        {/*          >*/}
        {/*            <div className={'mb-3 flex overflow-hidden rounded-md'}>*/}
        {/*              <Image*/}
        {/*                src={node.featuredImage?.node.sourceUrl}*/}
        {/*                alt={node.featuredImage?.node.altText}*/}
        {/*                style={{*/}
        {/*                  minWidth: '100%',*/}
        {/*                  minHeight: '100%',*/}
        {/*                }}*/}
        {/*                width={500}*/}
        {/*                height={500}*/}
        {/*                className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"*/}
        {/*              />*/}
        {/*            </div>*/}
        {/*            <h4 className={'text-gray700'}>{node.title}</h4>*/}
        {/*          </Link>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </Container>*/}
        {/*  </section>*/}
        {/*)}*/}
      </article>
      {/*{page?.postType?.affiliateLink && <StickyCasino item={page} />}*/}
    </>
  )
}
