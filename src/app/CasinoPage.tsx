import ModularContent from '@/src/components/content/ModularContent'
import getReviewStructuredData from '@/src/structured-data/casinoReviewStructuredData'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import getProductStructuredData from '@/src/structured-data/productStructuredData'
import CasinoHero from '@/src/components/casino/CasinoHero'
import CasinoService from '@/src/services/CasinoService'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import CasinoInfo from '@/src/components/casino/CasinoInfo'
import Avatar from '@/src/components/content/Avatar'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import { getHeadingObjectsByPage } from '@/src/lib/helpers'
import Container from '@/src/components/layout/Container'
import CasinoPageService from '@/src/services/CasinoPageService'
import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import Image from 'next/image'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { slugify } from '@/src/lib/helpers'
import Placeholder from '../components/utils/Placeholder'

const CasinoPage = ({
  casinoPage,
  similarCasinoPages,
}: {
  casinoPage: CasinoPageSchemaType
  similarCasinoPages: CasinoPageSchemaType[]
}) => {
  if (!casinoPage.casino) return (
    <Placeholder message="No casino attached to casino page" className="my-10" />
  )
  const casinoPageService = new CasinoPageService()
  const isValid = casinoPageService.validatePage(casinoPage)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getProductStructuredData({ productPage: casinoPage }),
      getWebPageStructuredData({ webPage: casinoPage }),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
    ],
  }
  const breadcrumbs = [
    {
      text: casinoPage.title,
    },
  ]
  const headings = getHeadingObjectsByPage({ objects: casinoPage.content })

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
            modifiedAt={casinoPageService.getPageModifiedAtTimestamp(
              casinoPage
            )}
            shareTitle={casinoPage.seoTitle}
            createdAt={casinoPageService.getPagePublishedAtTimestamp(
              casinoPage
            )}
          />
        </Container>
        {headings.length > 1 && (
          <Container narrow>
            <TableOfContents
              headings={headings.map((heading: HeadingObjectSchemaType) => {
                switch (heading._type) {
                  case 'heading-object': {
                    return {
                      text: heading.text,
                      slug: `${casinoPage.slug.current}#${slugify(heading.text)}`,
                    }
                  }
                  case 'rating-object': {
                    return {
                      text: heading.title,
                      slug: `${casinoPage.slug.current}#${slugify(heading.title)}`,
                    }
                  }
                }
              })}
            />
          </Container>
        )}
        {casinoPage.content && (
          <ModularContent
            objects={casinoPage.content}
            casino={casinoPage.casino}
            className="py-5"
            narrow
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
              <Heading
                level={3}
                sizes={[5, 5, 6]}
                className={'mb-4 text-gray-700 font-bold'}
                text={'Fler populära casinon'}
              />
              <div className={'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
                {similarCasinoPages.map((page) => (
                  <Link
                    href={`${process.env.SITE_URL}${page.slug.current}`}
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
                    <Heading
                      level={4}
                      sizes={[3, 3, 4]}
                      className={'text-gray-700'}
                      text={page.title}
                    />
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
