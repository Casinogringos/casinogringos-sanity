import ModularContent from '@/src/components/organisms/ModularContent'
import getReviewStructuredData from '@/src/structured-data/casinoReviewStructuredData'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import getProductStructuredData from '@/src/structured-data/productStructuredData'
import CasinoHero from '@/src/components/organisms/CasinoHero'
import CasinoService from '@/src/services/CasinoService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import CasinoInfo from '@/src/components/organisms/CasinoInfo'
import Avatar from '@/src/components/organisms/Avatar'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import Container from '@/src/components/atoms/Container'
import CasinoPageService from '@/src/services/CasinoPageService'
import Heading from '@/src/components/atoms/Heading'
import Link from '@/src/components/atoms/Link'
import Image from 'next/image'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'

const CasinoPage = ({
  casinoPage,
  similarCasinoPages,
}: {
  casinoPage: CasinoPageSchemaType
  similarCasinoPages: CasinoPageSchemaType[]
}) => {
  console.log('casino ratings', casinoPage.casino.casinoRatings)
  const casinoPageService = new CasinoPageService()
  const isValid = casinoPageService.validatePage(casinoPage)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getProductStructuredData({ productPage: casinoPage }), getWebPageStructuredData({ webPage: casinoPage }), getWebSiteStructuredData(), getOrganizationStructuredData()],
  }
  const breadcrumbs = [
    {
      text: casinoPage.title,
    },
  ]
  const headings = getHeadingObjectsByPage({ objects: casinoPage.content })
  console.log('casino pages', similarCasinoPages)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="casino-page-structured-data"
      />
      <article>
        <CasinoHero casinoPage={casinoPage} />
        <BreadCrumbs items={breadcrumbs} />
        <div className="border-b border-b-slate-100 bg-slate-50">
          <Container className="py-6" narrow>
            <CasinoInfo casinoPage={casinoPage} />
          </Container>
        </div>
        <Container className="pt-10 pb-6" narrow>
          <Avatar
            author={casinoPage.author}
            reviewer={casinoPage.reviewer}
            modified={casinoPage._updatedAt ?? casinoPage.originalModifiedAt}
            shareTitle={casinoPage.seoTitle}
            date={casinoPage.originalPublishedAt ?? casinoPage._createdAt}
            pathname={casinoPage.slug.current}
          />
        </Container>
        {headings.length > 1 && (
          <Container narrow>
            <TableOfContents headings={headings} />
          </Container>
        )}
        {casinoPage.content && (
          <ModularContent
            objects={casinoPage.content}
            casino={casinoPage.casino}
          />
        )}
        {/*{page?.author && (*/}
        {/*  <div className="mx-4 lg:mx-0">*/}
        {/*    <AuthorBox*/}
        {/*      author={page?.author}*/}
        {/*      modified={page?.modified}*/}
        {/*      reviewedBy={page?.reviewer}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
        {similarCasinoPages && (
          <section className={'bg-gray-100 py-10'}>
            <Container>
              <Heading level={3} size={6} className={'mb-4 text-gray-700 font-bold'} text={'Fler populära casinon'} />
              <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
                {similarCasinoPages.map((page) => (
                  <Link
                    href={`/${page.slug.current}`}
                    key={`similar-post-${page._id}`}
                    className={'flex flex-col'}
                  >
                    <div className={'mb-3 flex overflow-hidden rounded-md'}>
                      <Image
                        src={page.featuredImage.src}
                        alt={page.featuredImage.alt}
                        style={{
                          minWidth: '100%',
                          minHeight: '100%',
                        }}
                        width={500}
                        height={500}
                        className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"
                      />
                    </div>
                    <Heading level={4} className={'text-gray-700'} text={page.title} />
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>
      {/*{page?.postType?.affiliateLink && <StickyCasino item={page} />}*/}
    </>
  )
}

export default CasinoPage
