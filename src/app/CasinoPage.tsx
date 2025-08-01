import ModularContent from '@/src/components/organisms/ModularContent'
import getReviewStructuredData from '@/src/structured-data/casinoReviewStructuredData'
import { CasinoPageSchemaType } from '@/src/schemas'
import getProductStructuredData from '@/src/structured-data/productStructuredData'
import CasinoHero from '@/src/components/organisms/CasinoHero'
import CasinoService from '@/src/services/CasinoService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import CasinoInfo from '@/src/components/organisms/CasinoInfo'

const CasinoPage = ({
  casinoPage,
  similarCasinoPages,
}: {
  casinoPage: CasinoPageSchemaType
  similarCasinoPages: CasinoPageSchemaType[]
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getProductStructuredData({ productPage: casinoPage })],
  }
  const breadcrumbs = [
    {
      name: 'Hem',
      url: '/',
    },
    {
      name: casinoPage.title,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="casino-page-structured-data"
      />
      <article>
        <CasinoHero
          casinoPage={casinoPage}
        />
        <BreadCrumbs items={breadcrumbs} />
        <div className="border-b border-b-slate100 bg-slate50 px-4 pb-4 pt-8 md:pb-6 lg:px-0">
          <CasinoInfo casinoPage={casinoPage} />
        </div>
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
        {casinoPage.content && <ModularContent objects={casinoPage.content} />}
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

export default CasinoPage
