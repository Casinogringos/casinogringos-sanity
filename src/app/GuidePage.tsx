import ModularContent from '@/src/components/organisms/ModularContent'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { getBlogPostingStructuredData } from '@/src/structured-data/blogPostingStructuredData'
import SanityImage from '@/src/components/atoms/SanityImage'
import PostHeader from '@/src/components/molecules/PostHeader'
import PageService from '@/src/services/PageService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import Container from '@/src/components/atoms/Container'
import Link from '@/src/components/atoms/Link'

const pageService = new PageService()

export default function GuidePage({
  page,
  similarGuidePages,
}: {
  page: GuidePageSchemaType
  similarGuidePages: GuidePageSchemaType[]
}) {
  const isValid = pageService.validateSchema(page)
  if (!isValid) {
    return null
  }
  const headings = pageService.getHeadingObjects(page)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getBlogPostingStructuredData({ page })],
  }
  const breadcrumbs = [
    {
      text: 'Hem',
      url: `${process.env.SITE_URL}/`,
    },
    {
      text: 'Guider',
      url: `${process.env.SITE_URL}/guider`,
    },
    {
      text: page.title,
      url: `${process.env.SITE_URL}/guider/${page.slug.current}`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
        key="guide-page-structured-data"
      />
      <div className="mx-auto mb-0 max-w-3xl px-4 pt-6 lg:px-0">
        {page.featuredImage && (
          <div className="mb-4 flex h-auto items-start overflow-hidden rounded-md lg:mb-8 lg:mt-8 lg:h-96">
            <SanityImage
              image={page.featuredImage.image}
              priority={true}
              width={768}
              className="h-full w-full object-cover"
            />{' '}
          </div>
        )}
        <PostHeader post={page} />
      </div>
      {breadcrumbs && <BreadCrumbs items={breadcrumbs} />}
      {headings.length > 1 && (
        <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">
          <TableOfContents headings={headings} />
        </div>
      )}
      <ModularContent objects={page.content} />
      {page?.author && (
        <div className="mx-4 lg:mx-0">
          <AuthorBox
            author={page?.author}
            modified={page?._updatedAt ?? page?.originalModifiedAt}
            reviewedBy={page?.reviewer}
          />
        </div>
      )}
      {similarGuidePages && (
        <section className="bg-gray100 py-10">
          <Container>
            <h3 className="mb-4 text-2xl text-gray700">Fler guider</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similarGuidePages.map((guidePage) => (
                <Link
                  href={`/guider/${guidePage.slug.current}`}
                  key={`guide-page-${guidePage._id}`}
                  className="flex flex-col"
                >
                  {guidePage.featuredImage && (
                    <div
                      className="flex rounded-md overflow-hidden mb-3 relative"
                    >
                      <SanityImage
                        image={guidePage.featuredImage.image}
                        width={500}
                        className="h-28 object-cover sm:h-48 md:h-56 lg:h-40"
                      />
                    </div>
                  )}
                  <h4 className="text-gray700">{guidePage.title}</h4>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
