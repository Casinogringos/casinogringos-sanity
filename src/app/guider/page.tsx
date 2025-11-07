import GuideIndex from '@/src/app/GuideIndex'
import {
  getGuidePageCount,
  getGuidePagePreviews,
  getPageBySlug,
} from '@/src/lib/api'
import Pagination from '@/src/components/content/Pagination'
import BreadCrumbs from '@/src/components/navigation/BreadCrumbs'
import { Metadata } from 'next'

export async function generateMetadata() {
  const page = await getPageBySlug({ slug: '/guider' })
  const siteURL = (process.env.NEXT_PUBLIC_SITE_URL as string) + page.slug.current
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
      type: page.opengraphType ?? 'website',
    },
  }
  if (metadata.openGraph && page.seoImage) {
    metadata.openGraph.images = [
      {
        url: page.seoImage.src,
        alt: page.seoImage.alt,
        width: 1200,
        height: 630,
      },
    ]
  }

  return metadata
}

const Page = async () => {
  const guides = await getGuidePagePreviews({ count: 24, offset: 0 })
  const guidesCount = await getGuidePageCount()
  const page = await getPageBySlug({ slug: '/guider' })
  const pageCount = Math.ceil(guidesCount / 24)

  return (
    <GuideIndex
      guidePages={guides}
      page={page}
      pageCount={pageCount}
      currentPage={1}
    />
  )
}

export default Page
