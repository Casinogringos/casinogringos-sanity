import ModularContent from '@/src/components/organisms/ModularContent'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import { getBlogPostingStructuredData } from '@/src/structured-data/blogPostingStructuredData'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import TableOfContents from '@/src/components/organisms/TableOfContents'
import AuthorBox from '@/src/components/organisms/AuthorBox'
import Container from '@/src/components/atoms/Container'
import Link from '@/src/components/atoms/Link'
import Image from 'next/image'
import ArticleHeader from '@/src/components/molecules/ArticleHeader'
import GuidePageService from '@/src/services/GuidePageService'
import Heading from '@/src/components/atoms/Heading'
import ArticleCard from '../components/molecules/ArticleCard'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'

const guidePageService = new GuidePageService()

export default function GuidePage({
  page,
  similarGuidePages,
}: {
  page: GuidePageSchemaType
  similarGuidePages: GuidePageSchemaType[]
}) {
  const isValid = guidePageService.validatePage(page, false)
  if (!isValid) {
    return null
  }
  const headings = guidePageService.getHeadingObjects(page)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getBlogPostingStructuredData({ page }), getWebPageStructuredData({ webPage: page }), getWebSiteStructuredData(), getOrganizationStructuredData()],
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
      <BreadCrumbs items={breadcrumbs} />
      <Container narrow>
        {page.featuredImage.src && (
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
        <ArticleHeader article={page} />
      </Container>
      {headings.length > 1 && (
        <Container narrow>
          <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">
            <TableOfContents headings={headings} />
          </div>
        </Container>
      )}
      <ModularContent narrow objects={page.content} className={'py-5'} />
      {(page?.author || page?.reviewer) && (
        <div className="mx-4 lg:mx-0">
          <AuthorBox
            author={page?.author}
            modified={guidePageService.getPageModifiedAtTimestamp(page)}
            reviewedBy={page?.reviewer}
          />
        </div>
      )}
      {similarGuidePages && (
        <section className="bg-gray-100 py-10">
          <Container narrow>
            <Heading
              level={3}
              size={6}
              className="mb-4 font-bold text-gray-700"
              text="Fler guider"
            />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similarGuidePages.map((guidePage) => (
                <ArticleCard key={guidePage._id} item={guidePage} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
