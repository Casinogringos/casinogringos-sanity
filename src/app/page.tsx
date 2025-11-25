import HomePage from '@/src/app/HomePage'
import { getNewsPagePreviews, getPageBySlug } from '@/src/lib/api'
import { SubPageSchemaType } from '@/src/schemas/subPage'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const homepage = (await getPageBySlug({
    slug: '/',
  })) as SubPageSchemaType
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL as string
  const metadata: Metadata = {
    title: homepage.seoTitle ?? homepage.title,
    description: homepage.seoDescription,
    alternates: {
      canonical: 'https://casinogringos.se/',
    },
    openGraph: {
      title: homepage.seoTitle,
      description: homepage.seoDescription,
      url: siteURL,
      locale: 'sv_SE',
      siteName: 'Casinogringos',
      images: [
        {
          url: homepage.seoImage.src,
          alt: homepage.seoImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
  }

  return metadata
}

export default async function Page() {
  const homepage = await getPageBySlug({
    slug: '/',
  })
  const news = await getNewsPagePreviews({ count: 3, offset: 0 })

  if (!homepage) return notFound()
  return (
    <HomePage
      page={homepage}
      news={news}
      toplistCategories={homepage.bonusCategory}
    />
  )
}
