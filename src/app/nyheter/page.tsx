import NewsIndex from '@/src/app/NewsIndex'
import Pagination from '@/src/components/organisms/Pagination'
import { getNewsPageCount, getNewsPagePreviews, getPageBySlug } from '@/src/lib/api'
import { urlFor } from '@/src/lib/client'
import { SubPageSchemaType } from '@/src/schemas'
import { Metadata } from 'next'

export async function generateMetadata() {
  const page: SubPageSchemaType = (await getPageBySlug({
    slug: '/nyheter',
  }))
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
