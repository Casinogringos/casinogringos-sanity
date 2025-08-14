import ModularContent from '@/src/components/organisms/ModularContent'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { getBlogPostingStructuredData } from '@/src/structured-data/blogPostingStructuredData'
import PostHeader from '@/src/components/molecules/PostHeader'
import GuideService from '@/src/services/GuidePageService'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import Container from '@/src/components/atoms/Container'
import Link from '@/src/components/atoms/Link'
import Image from 'next/image'

const guideService = new GuideService()

export default function GuidePage({
  page,
  similarGuidePages,
}: {
  page: GuidePageSchemaType
  similarGuidePages: GuidePageSchemaType[]
}) {
  const isValid = guideService.validatePage(page, false)
  if (!isValid) {
    return null
  }
  const headings = guideService.getHeadingObjects(page)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getBlogPostingStructuredData({ page })],
  }
  const breadcrumbs = [
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
            <Image
              src={page.featuredImage.src}
              alt={page.featuredImage.alt}
              width={768}
              height={400}
              className="h-full w-full object-cover"
            />{' '}
          </div>
        )}
        <PostHeader post={page} />
      </div>
      <BreadCrumbs items={breadcrumbs} />
      {headings.length > 1 && (
        <Container narrow>
          <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">
            <TableOfContents headings={headings} />
          </div>
        </Container>
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
        <section className="bg-gray-100 py-10">
          <Container>
            <h3 className="mb-4 text-2xl text-gray-700">Fler guider</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similarGuidePages.map((guidePage) => (
                <Link
                  href={guidePage.slug.current}
                  key={`guide-page-${guidePage._id}`}
                  className="flex flex-col"
                >
                  {guidePage.featuredImage && (
                    <div
                      className="flex rounded-md overflow-hidden mb-3 relative"
                    >
                      <Image
                        src={guidePage.featuredImage.src}
                        alt={guidePage.featuredImage.alt}
                        width={500}
                        height={500}
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
