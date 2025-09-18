import GuideService from '@/src/services/GuidePageService'
const guideService = new GuideService()
import Container from '@/src/components/atoms/Container'
import Heading from '@/src/components/atoms/Heading'
import Breadcrumbs from '@/src/components/organisms/BreadCrumbs'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'
import ArticleCard from '@/src/components/molecules/ArticleCard'
import { PortableText } from 'next-sanity'
import { getGuidePageCount, getPageBySlug } from '@/src/lib/api'
import Pagination from '@/src/components/organisms/Pagination'
import { getWebPageStructuredData } from '@/src/structured-data/webPageStructuredData'
import { getWebSiteStructuredData } from '@/src/structured-data/webSiteStructuredData'
import { getOrganizationStructuredData } from '@/src/structured-data/organizationStructuredData'

const GuideIndex = ({
  page,
  guidePages,
  pageCount,
  currentPage,
}: {
  page: SubPageSchemaType
  guidePages: GuidePagePreviewSchemaType[]
  pageCount: number
  currentPage: number
}) => {
  const isValid = guideService.validateList(guidePages, true)
  if (!isValid) {
    return null
  }
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getWebPageStructuredData({ webPage: page }), getWebSiteStructuredData(), getOrganizationStructuredData()],
  }
  const breadcrumbItems = [
    {
      text: 'Guider',
      url: `${process.env.SITE_URL}/guider`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        key="guide-index-structured-data"
      />
      <Breadcrumbs items={breadcrumbItems} />
      <Container className="py-6 lg:py-12">
        <Heading level={1} size={8} className="font-bold mb-4" text={page.title} />
        <div className='text-slate-500'>
          <PortableText value={page.intro} />
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {guidePages.sort((a, b) => new Date(b.originalPublishedAt ?? b._createdAt).getTime() - new Date(a.originalPublishedAt ?? a._createdAt).getTime()).map((guide) => (
            <ArticleCard key={`guide-${guide._id}`} item={guide} />
          ))}
        </div>
        {pageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            numPages={pageCount}
            pathPrefix={'guider'}
            className={'font'}
          />
        )}
      </Container>
    </>
  )
}

export default GuideIndex
