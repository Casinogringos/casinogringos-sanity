import ModularContent from '@/src/components/content/ModularContent'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import TableOfContents from '@/src/components/navigation/TableOfContents'
import AuthorBox from '@/src/components/content/AuthorBox'
import Container from '@/src/components/layout/Container'
import Image from 'next/image'
import ArticleHeader from '@/src/components/article/ArticleHeader'
import GuidePageService from '@/src/services/GuidePageService'
import Heading from '@/src/components/content/Heading'
import ArticleCard from '../components/article/ArticleCard'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'
import { HeadingObjectSchemaType } from '../schemas/headingObject'
import { slugify } from '@/src/lib/utils'
import { getFeaturedImageStructuredData } from '../structured-data/featuredImageStructuredData'
import getArticleStructuredData from '../structured-data/articleStructuredData'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'

const guidePageService = new GuidePageService()

export default function GuidePage({
  page,
  similarGuidePages,
}: {
  page: GuidePageSchemaType
  similarGuidePages: GuidePagePreviewSchemaType[]
}) {
  const isValid = guidePageService.validatePage(page, false)
  const headings = guidePageService.getHeadingObjects(page)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      getArticleStructuredData(page),
      getWebPageStructuredData(page),
      getFeaturedImageStructuredData(page),
      getWebSiteStructuredData(),
      getOrganizationStructuredData(),
    ],
  }
  const breadcrumbs = [
    {
      text: 'Guider',
      url: `/guider`,
    },
    {
      text: page.title,
      url: `${process.env.SITE_URL}${page.slug.current}`,
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
      <Container width={3}>
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
        <Container width={3}>
          <div className="-mb-6 mt-4 px-4 lg:mt-5 lg:px-0">
            <TableOfContents
              headings={headings.map((heading: HeadingObjectSchemaType) => ({
                text: heading.text,
                slug: `${page.slug.current}#${slugify(heading.text)}`,
              }))}
            />
          </div>
        </Container>
      )}
      <ModularContent width={3} objects={page.content} className={'py-5'} />
      {(page?.author || page?.reviewer) && (
        <Container width={3}>
          <AuthorBox
            author={page?.author}
            modified={guidePageService.getPageModifiedAtTimestamp(page)}
            reviewedBy={page?.reviewer}
          />
        </Container>
      )}
      {similarGuidePages && (
        <section className="bg-gray-100 py-10">
          <Container>
            <Heading
              level={3}
              sizes={[6, 6, 7]}
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
