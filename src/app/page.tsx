import HomePage from '@/src/app/HomePage'
import { getPageBySlug } from '@/src/lib/api'
import { Page as PageType } from '@/src/types/index'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const homepage = (await getPageBySlug({
    slug: '/',
  })) as PageType
  const siteURL = process.env.SITE_URLs
  const metadata = {
    title: homepage.seo.title ?? homepage.title,
    description: homepage.seo.metaDesc,
    alternates: {
      canonical: siteURL,
    },
    openGraph: {
      title: homepage.seo.title,
      description: homepage.seo.metaDesc,
      url: siteURL,
      locale: 'sv_SE',
      siteName: homepage.seo.opengraphSiteName,
      images: [
        {
          url: homepage.seo.opengraphImage?.sourceUrl ?? '',
          alt: homepage.seo.opengraphImage?.altText ?? '',
          width: homepage.seo.opengraphImage?.mediaDetails.width ?? 1200,
          height: homepage.seo.opengraphImage?.mediaDetails.height ?? 630,
        },
      ],
    },
  } as Metadata

  return metadata
}

export default async function Page() {
  const homepage = await getPageBySlug({
    slug: '/',
  })

  const guides = await getGuidePreviews({ count: 3 })
  if (!homepage) return notFound()

  return <HomePage page={homepage} guides={guides.edges} />
}
