import CasinoHero from '@/src/components/casino/CasinoHero'
import CasinoInfo from '@/src/components/casino/CasinoInfo'
import AuthorBox from '@/src/components/content/AuthorBox'
import Avatar from '@/src/components/content/Avatar'
import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import ModularContent from '@/src/components/content/ModularContent'
import Container from '@/src/components/layout/Container'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import Placeholder from '@/src/components/utils/Placeholder'
import { getHeadingObjectsByPage, slugify } from '@/src/lib/helpers'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import CasinoPageService from '@/src/services/CasinoPageService'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import getProductStructuredData from '@/src/structured-data/productStructuredData'
import getReviewStructuredData from '@/src/structured-data/reviewStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import Image from 'next/image'

const CasinoPage = ({
  casinoPage,
  similarCasinoPages,
}: {
  casinoPage: CasinoPageSchemaType
  similarCasinoPages: CasinoPageSchemaType[]
}) => {
  if (!casinoPage.casino)
    return (
      <Placeholder
        message="No casino attached to casino page"
        className="my-10"
      />
    )
  const casinoPageService = new CasinoPageService()
  const isValid = casinoPageService.validatePage(casinoPage)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
      getProductStructuredData({ productPage: casinoPage }),
      getReviewStructuredData({ reviewPage: casinoPage }),
    ],
  }
  const breadcrumbs = [
    {
      text: casinoPage.title,
      url: `${process.env.SITE_URL}${casinoPage.slug.current}`,
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
              headings={headings
                .filter((heading) => heading.text || heading.title)
                .map((heading: HeadingObjectSchemaType) => {
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
        {casinoPage?.author && (
          <Container narrow>
            <AuthorBox
              author={casinoPage?.author}
              modified={casinoPageService.getPageModifiedAtTimestamp(
                casinoPage
              )}
              reviewedBy={casinoPage?.reviewer}
            />
          </Container>
        )}
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
