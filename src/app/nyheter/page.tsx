import NewsIndex from '@/src/app/NewsIndex'
import Pagination from '@/src/components/content/Pagination'
import {
  getNewsPageCount,
  getNewsPagePreviews,
  getPageBySlug,
} from '@/src/lib/api'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { Metadata } from 'next'

export async function generateMetadata() {
  const page: SubPageSchemaType = await getPageBySlug({
    slug: '/nyheter',
  })
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
      images: [],
    },
  }
  if (page.seoImage?.src && metadata.openGraph) {
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
  const news = await getNewsPagePreviews({ count: 24, offset: 0 })
  const newsCount = await getNewsPageCount()
  const pageCount = Math.ceil(newsCount / 24)

  return (
    <>
      <NewsIndex newsPages={news} />
      {pageCount > 1 && (
        <Pagination
          currentPage={1}
          numPages={pageCount}
          pathPrefix={'nyheter'}
        />
      )}
    </>
  )
}

export default Page
