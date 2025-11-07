import { getPageBySlug, getSlotPagePreviews } from '@/src/lib/api'
import SlotIndex from '@/src/app/SlotIndex'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata() {
  const page = await getPageBySlug({ slug: '/slots' })
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
      images: [
        {
          url: page.seoImage?.src,
          alt: page.seoImage?.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
  }

  return metadata
}

export default async function Page() {
  const slotPages = await getSlotPagePreviews({})
  const page = await getPageBySlug({ slug: '/slots' })
  if (!page) {
    return notFound()
  }

  return <SlotIndex page={page} slotPages={slotPages} />
}

export const dynamic = 'force-static'
