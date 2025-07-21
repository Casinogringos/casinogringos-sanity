import GuideIndex from '@/src/app/GuideIndex'
import {
  getGuidePageCount,
  getGuidePagePreviews,
  getPageBySlug,
} from '@/src/lib/api'
import Pagination from '@/src/components/organisms/Pagination'
import BreadCrumbs from '@/src/components/organisms/BreadCrumbs'
import { urlFor } from '@/src/lib/client'
import { Metadata } from 'next'

export async function generateMetadata() {
  const page = await getPageBySlug({ slug: '/guider' })
  const siteURL = (process.env.SITE_URL as string) + page.slug.current
  const metadata: Metadata = {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: siteURL,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      type: page.opengraphType,
      images: [
        {
          url: urlFor(page.seoImage).url(),
          alt: page.seoImage.alt,
          width: page.seoImage.asset?.metadata?.dimensions?.width ?? 1200,
          height: page.seoImage.asset?.metadata?.dimensions?.height ?? 630,
        },
      ],
    },
  }

  return metadata
}

const Page = async () => {
  const guides = await getGuidePagePreviews({ count: 24, offset: 0 })
  const guidesCount = await getGuidePageCount()
  const page = await getPageBySlug({ slug: '/guider' })
  const pageCount = Math.ceil(guidesCount / 24)
  const breadcrumbItems = [
    {
      text: 'Hem',
      url: `${process.env.SITE_URL}/`,
    },
    {
      text: 'Guider',
      url: `${process.env.SITE_URL}/guider`,
    },
  ]

  return (
    <>
      <BreadCrumbs items={breadcrumbItems} />
      <GuideIndex guidePages={guides} page={page} breadcrumbs={breadcrumbItems} />
      {pageCount > 1 && (
        <Pagination
          currentPage={1}
          numPages={pageCount}
          pathPrefix={'guider'}
          className={'font'}
        />
      )}
    </>
  )
}

export default Page
//
// export const dynamic = 'force-static'
